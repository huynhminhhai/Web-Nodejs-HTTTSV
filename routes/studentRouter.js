const express = require('express')
const router = express.Router()
const fs = require('fs')

const Student = require('../app/models/StudentUser')
const Post = require('../app/models/Posts')
const Comment = require('../app/models/Comments')
const User = require('../app/models/User')
// Upload ảnh

const multer = require('multer')
const upload = multer({ dest: 'uploads/', fileFilter: (req, file, callback) => {

    if (file.mimetype.startsWith('image/') ) {
        callback(null,true)
    }
    else  callback(null,false)


}})

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        var dir = "./uploads"
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        callback(null, dir)
    },

    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
})

const uploads = multer({storage: storage}).array('fileImg', 12)

router.get('/information', (req,res) => {
    res.render('in4')
})

router.post('/information', (req,res,next) => {

    let uploader = upload.single('img')

    uploader(req,res,next => {

        const {fullname, classcode , faculty, img} = req.body

        const image = req.file
        
        if (image) {
            imagePath =  image.originalname
            fs.renameSync(image.path, 'uploads/' + image.originalname)
        }else {
            imagePath = ''
        }


        Student.updateOne({fullname: fullname}, {class: classcode, faculty: faculty, img: imagePath})
        .then(() => res.redirect('/home'))
        .catch(next)

    })

})

router.get('/posts', (req,res) => {
    Post.find({}, (err,posts) => {
        Comment.find({}, (err,comments) => {
            res.send({posts, comments})
        })
    })
})

router.post('/posts', (req,res,next) => {

    uploads(req,res,next => {
        // console.log(req.files.length)
        // console.log(req.body)
        const {text, idPoster, urlvideo} = req.body
        const totalImg = req.files.length
        const image = req.files
        let img = []

        // console.log(image)

        

        if (req.files.length) {
            for(var i = 0; i< totalImg; i++) {
                img.push(req.files[i].originalname)
            }
        }

        if (!text && image === [] && !urlvideo) {
            console.log('empty')
        }else {
            const post = new Post({text: text,img: img, urlVideo: urlvideo, idP: idPoster, postMan: ""})
            post.save()
                .then(() => res.send('ok'))
                .then(
                    Student.findOne({_id: idPoster}, (err,student) => {
                        if (!err && student) {
                            Post.updateMany({idP: idPoster}, {postMan: student})
                                .then()
                                .catch(next)
                        }
                    })
        
                )
                .then(
                    User.findOne({_id:idPoster}, (err1,user) => {
                        if(!err1 && user) {
                            Post.updateMany({idP: idPoster}, {postMan: user})
                                .then()
                                .catch(next)
                        }
                    })
                )
                .catch(next)
        }
        

    })

    // res.send('ok')

})

router.delete('/posts/:id', (req,res,next) => {
    let id = req.params.id

    Post.deleteOne({_id: id})
        .then(() => res.send('ok'))
        .then(
            Comment.deleteMany({idPost: id})
                .then()
                .catch(next)
        )
        .catch(next)
})


router.put('/posts/:id', (req,res,next) => {
    let uploader = upload.single('file-img')

    uploader(req,res,next => {

    const {text, urlvideo, id} = req.body

    // console.log(req.body)
    // console.log(req.file)
    const image = req.file
    if(image) {
        imagePath =  image.originalname
        fs.renameSync(image.path, 'uploads/' + image.originalname)
    }else {
        imagePath = ""
    }


    Post.updateOne({_id: id}, {text: text, urlVideo: urlvideo, img: imagePath})
        .then(() => res.send('ok'))
        .catch(next)
    })
})

router.get('/comments', (req,res) => {
    Post.find({}, (err,posts) => {
        Comment.find({}, (err,comments) => {
            res.send({posts, comments})
        })
    })
})

router.post('/comments', (req,res,next) => {
    // console.log(req.body)
    res.send('ok')
    const {textCmt, idPost, idC} = req.body

    const comment = new Comment({text: textCmt, idPost: idPost, idC: idC})
    comment.save()
        .then(
            Student.findOne({_id: idC}, (err,student) => {
                if (!err && student) {
                    Comment.updateMany({idC: idC}, {cmtMan: student})
                        .then()
                        .catch(next)
                }
            })
        )
        .then(
            User.findOne({_id: idC}, (err,user) => {
                if (!err && user) {
                    Comment.updateMany({idC: idC}, {cmtMan: user})
                        .then()
                        .catch(next)
                }
            })
        )
        .catch(next)
})

router.delete('/comments/:id', (req,res,next) => {
    let id = req.params.id
    // console.log(id)
    Comment.deleteOne({_id: id})
        .then(() => res.send('ok'))
        .catch(next)
})

router.get('/user/:idUser/:id', (req,res) => {
    const id = req.params.id
    const idUser = req.params.idUser
    User.findOne({_id: idUser}, (err, user) => {
        if(!err && user) {
            res.render('personalPost',{id,user})
        }else {
            Student.findOne({_id: idUser}, (err, user) => {
                res.render('personalPost',{id,user})
            })
        }
    })
})

router.get('/post-personal/:idUser/:id', (req,res) => {
    // console.log(req.params)
    const id = req.params.id
    const idUser = req.params.idUser
    Post.find({idP: id},(err,posts) => {
        Comment.find({}, (err1, comments) => {
            res.send({posts,comments})
        })
    })
})
module.exports = router