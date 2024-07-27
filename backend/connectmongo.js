const mongoose = require('mongoose');

const connectDb =  ()=>{
    try {
        mongoose.connect(process.env.MONGO_CONNECT_URI );
        console.log('connected');
    } catch (error) {
        
    }
}
module.exports = connectDb;