const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const cookieSession = require('cookie-session')

//import
const User = require('../app/models/User')
const Student = require('../app/models/StudentUser')
const Information = require('../app/models/Information')
require('../passport')

const router = express.Router()

// MongoDb
const db = require('../db')
const { render } = require('node-sass')
db.connect()

const isLoggedIn = (req, res, next) => {
    if(req.user) {
        next()
    }else if(req.session.username) {
        next()
    }else {
        res.redirect('/login')
    }
}



//-------------------------------------
router.get('/', (req,res) => {
    res.redirect('/home')
})

router.get('/home', isLoggedIn,  (req,res) => {
    if (req.user === undefined) {
        username = req.session.username
        User.find({username: username}, function(err,user) {
            if(err) {
                return res.status(500).send()
            }else if(!user) {
                return res.redirect('/login')
            }else {
                user = user[0]
                res.render('home', {username, user})
            }
        })
    } else {
        username = req.user.displayName
        id = req.user.id
        Student.findOne({id: id}, function(err, student) {
            if(err) {
                return res.status(500).send()
            }else if(!student) {
                return res.redirect('/login')
            }else {
                user = student
                res.render('home', {username, user})
            }
        })
    }
})

router.get('/login', (req,res) => {
    if (req.user) {
        res.redirect('/home')
    }else if (req.session.username) {
        res.redirect('/home')
    }else {
        res.render('login', {
            username: '',
            password: '',
            mess: ''
        })
    }
})

router.post('/login', (req,res) => {

    let username = req.body.username
    let password = req.body.password
    let mess = ''

    User.findOne({username: username}, function(err, user)  {
        if(err) {
            // console.log(err)
            return res.status(500).send()
        }else if(!user) {
            mess = 'User is not exist'
            res.render('login', {
                username, password, mess
            })
        }else {
            const hashed = user.password
            // console.log(hashed)
            const match = bcrypt.compareSync(password,hashed)
            // console.log(match)

            if(!match) {
                mess = 'Password is not correct'
                res.render('login', {
                    username, password, mess
                })
            }else {
                req.session.username = req.body.username
                res.redirect('/home')
            }
        }
    })
})

// //Google
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res, next) {
    // Successful authentication, redirect home.'
    if (req.user._json.hd === 'student.tdtu.edu.vn') {
        // Find neu co thi k luu neu k co thi` luu
        const email = req.user._json.email
        // console.log(email)
        Student.findOne({email: email}, function(err, student) {
            if(err) {
                return res.status(500).send()
            }else if(!student) {
                const fullname = req.user.displayName

                // Information.findOne({fullname: fullname}, function(err1, information) {
                //     if(err1) {
                //         return res.status(500).send()
                //     }else if(!information) {
                //         const information = new Information({fullname: fullname, class: '', faculty: ''})
                //         information.save()
                //     }
                // })

                const email = req.user._json.email
                const id = req.user.id
                const student = new Student({email: email, id: id, fullname: fullname, class: '', faculty: '', img: ''})
                student.save()
                    .then(() => res.redirect('/home'))
                    .catch(next)
            }else if(student){
                return res.redirect('/home')
            }
        })

    }else {
        res.redirect('/logout')
    }
});

// //------------------------------------

router.get('/register', (req, res) => {
    res.render('register', {username: '', password: '', mess: ''})
})

router.post('/register', (req,res,next) => {

    let mess = ''
    const {username, password, permission} = req.body

    if (!username) {
        mess = 'Chưa nhập tên người dùng'
    }else if (!password) {
        mess = 'Chưa nhập mật khẩu'
    }else if(password.length < 6) {
        mess = 'Mật khẩu phải có ít nhất 6 kí tự'
    }else if(username.length < 4) {
        mess = 'Tên người dùng phải có ít nhất 4 kí tự'
    }else if (permission === undefined) {
        mess = 'Chưa chọn Phòng/Khoa'
    }

    User.findOne({username: username}, function(err,user) {
        if(err) {
            return res.status(500).send()
        }else if(user) {
            mess = 'Tên đăng nhập đã tồn tại'
            res.render('register', {username, password, mess})
        }else {
            if (mess === '') {
                const hashed = bcrypt.hashSync(password,10)
            
                const user = new User({username : username, password: hashed, position: permission, img: "avatar1.jpg", fullname:username})
                user.save()
                    .then(() => res.redirect('/home'))
                    .catch(next)
            }
            else {
                res.render('register', {username, password, mess})
            }
        }
    })
})

router.get('/reset-password', (req,res) => {
    res.render('resetpassword', {mess: '', newPassword: '', confirmPassword: ''})
})

router.post('/reset-password', (req,res, next) => {
    const {newPassword, confirmPassword} = req.body
    let mess = ''
    
    if (!newPassword) {
        mess = 'Chưa nhập mật khẩu mới'
    }else if (!confirmPassword) {
        mess = 'Chưa nhập mật khẩu xác thực'
    }else if(newPassword.length < 6 || confirmPassword.length < 6) {
        mess = 'Mật khẩu phải lớn hơn 6 kí tự'
    }else if(newPassword !== confirmPassword) {
        mess = 'Mật khẩu không trùng khớp'
    }
    
    if(mess === '') {
        const hashed = bcrypt.hashSync(newPassword,10)
        
        User.updateOne({username: req.session.username}, {password: hashed})
        .then(() => res.redirect('/home'))
        .catch(next)
    }else {
        res.render('resetpassword', {mess, newPassword, confirmPassword})
    }
    
})

router.get('/logout', (req,res) => {
    req.session = null
    req.logout()
    res.redirect('/login')
})


module.exports = router