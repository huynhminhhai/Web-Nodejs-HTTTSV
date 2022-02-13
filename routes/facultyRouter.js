const express = require('express')
const router = express.Router()

const User = require('../app/models/User')
const Notification = require('../app/models/Notification')
const Faculty = require('../app/models/Faculty')
const Student = require('../app/models/StudentUser')


router.get('/noti', (req,res) => {
    User.find({}, (err,users) => {
        res.send(users)
    })
})

router.get('/notifications/:faculty/:idUser', (req,res) => {
    const faculty  = req.params.faculty
    const idUser = req.params.idUser
    res.render('notification',{faculty,idUser,mess:"",titlenoti:"",textnoti:""})
})

router.post('/notifications/:faculty/:idUser', (req,res,next) => {
    // console.log(req.body)
    const {faculty, idUser, titlenoti, textnoti} = req.body
    let mess = undefined

    if(titlenoti === '') {
        mess = "Vui lòng nhập tiêu đề thông báo"
    }else if(textnoti === '') {
        mess = "vui lòng nhập nội dung thông báo"
    }

    if (mess !== undefined) {
        res.render('notification', {faculty,idUser,mess,titlenoti,textnoti})
    }else {
        const notification = new Notification({title: titlenoti, text: textnoti, faculty: faculty, idUser: idUser})
        notification.save()
            .then(() => res.redirect('/'))
            .then(console.log('ok'))
            .catch(next)
    }
})

router.get('/noti-lists', (req,res) => {
    Notification.find({}, (err,notifications) => {
        User.find({}, (err,users) => {
            res.send({notifications,users})
        })
    })
})

router.get('/detail-noti/:id/:idUser', (req,res) => {
    const idUser = req.params.idUser
    const idNoti = req.params.id
    Notification.findOne({_id: idNoti}, (err,noti) => {
        res.render('detailNoti', {noti,idUser})
    })
})

router.get('/delete-noti/:id', (req,res,next) => {
    const idNoti = req.params.id
    Notification.deleteOne({_id: idNoti})
        .then(() => res.redirect('/'))
        .catch(next)
})

router.get('/update-noti/:id',(req,res) => {
    const id = req.params.id
    Notification.findOne({_id:id}, (err,noti) => {
        if(!err && noti) {
            res.render('updateNoti',{mess:"",titlenoti:noti.title, textnoti:noti.text})
        }
    })
})

router.post('/update-noti/:id',(req,res,next) => {
    // console.log(req.body)
    const {titlenoti, textnoti} = req.body
    const id = req.params.id
    let mess = ""

    if(titlenoti === '') {
        mess = "Vui lòng nhập tiêu đề thông báo"
    }else if(textnoti === '') {
        mess = "Vui lòng nhập nội dung thông báo"
    }

    if(mess !== "") {
        res.render('updateNoti', {mess,titlenoti,textnoti})
    }else {
        Notification.updateOne({_id:id},{title: titlenoti, text: textnoti})
            .then(() => res.redirect('/'))
            .catch(next)
    }
})

router.get('/faculties', (req,res) => {
    Faculty.find({}, (err,faculties) => {
        res.send({faculties})
    })
})

router.get('/noti/:faculty/:idUser', (req,res) => {
    // console.log(req.params)
    const idUser = req.params.idUser
    const faculty = req.params.faculty
    Notification.find({faculty: faculty}, (err,notis) => {
            User.findOne({_id: idUser}, (err,user) => {
                if(!err && user) {
                    res.render('notiFaculty',{notis,user,faculty})
                }else {
                    Student.findOne({_id: idUser}, (err,user) => {
                        res.render('notiFaculty',{notis,user,faculty})
                    })
                }
            })
    })
})

router.get('/noti-faculty/:faculty/:idUser', (req,res) => {
    // console.log(req.params.faculty)
    const idUser = req.params.idUser
    const faculty = req.params.faculty
    Notification.find({faculty: faculty}, (err,notis) => {
        if (!err && notis) {
            User.findOne({_id: idUser}, (err, user) => {
                if (!err && user) {
                    res.send({notis,user})
                }else {
                    Student.findOne({_id: idUser}, (err, user) => {
                        if (!err && user) {
                            res.send({notis, user})
                        }
                    })
                }
            })
        }
    })
})

router.get('/all-noti/:idUser', (req,res) => {
    const idUser = req.params.idUser
    User.findOne({_id: idUser}, (err,user) => {
        if(!err && user) {
            res.render('allNoti',{user})
        }else {
            Student.findOne({_id: idUser}, (err,user) =>{
                res.render('allNoti', {user})
            })
        }
    })
})

router.get('/allNoti', (req,res) => {
    Notification.find({}, (err,notis) => {
        if(!err && notis) {
            res.send({notis})
        }
    })
})

router.get('/noti-classify/:idUser', (req,res) => {
    const idUser = req.params.idUser
    User.findOne({_id: idUser}, (err,user) => {
        if(!err && user) {
            res.render('noti-classify',{user})
        }else {
            Student.findOne({_id: idUser}, (err,user) =>{
                res.render('noti-classify', {user})
            })
        }
    })
})

module.exports = router
