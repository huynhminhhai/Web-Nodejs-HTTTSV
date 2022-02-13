const mongoose = require('mongoose');

async function connect() {
    try{
        await mongoose.connect(process.env.MONGO_URI ||'mongodb+srv://huynhminhhai:GT9jfcDT9uJj1WKM@cttsv-nodejs.vdjtw.mongodb.net/cttsv-nodejs?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connect success')
    }catch (error){
        console.log('Connect fail')
    }
}

module.exports = {connect}