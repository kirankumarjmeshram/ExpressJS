const mongoose = require('mongoose');

const connetDB = async () => {
    try{
        mongoose.connect(process.env.MONGO_URI);
    }catch(error) {
        console.log("MongoDB connection error: ", error);
        process.exit(1);
    }
} 

module.exports = connetDB;