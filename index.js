require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const cookieSession = require('cookie-session')
const socket = require('socket.io')


const UserRouter = require('./routes/userRouter')
const studentRouter = require('./routes/studentRouter')
const facultyRouter = require('./routes/facultyRouter')
const app = express()

// Ejs
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'uploads')))
// BodyParser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//Cookie Session
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))
// Google
app.use(passport.initialize())
app.use(passport.session())


app.use('/', UserRouter)
app.use('/', studentRouter)
app.use('/', facultyRouter)

const port = process.env.PORT || 3000
var server =  app.listen(port, function() {
    console.log(`http://localhost:${port}`)
})


const io = socket(server);
io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("disconnect", function () {
    console.log("Made socket disconnected");
  });

  socket.on("send-notification", function (data) {
    io.emit("new-notification", data);
  });

});