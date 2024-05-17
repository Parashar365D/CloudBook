const mongoose = require('mongoose');
const mongooseURI = "mongodb://localhost:27017/CloudBook"


const connectToMongo = async ()=>{
    mongoose.connect(mongooseURI);
    console.log("connected");
}


module.exports = connectToMongo;