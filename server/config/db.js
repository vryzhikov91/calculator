// mongodb://127.0.0.1:27017/

const mongoose = require('mongoose');
const db = "mongodb://127.0.0.1:27017/calculator";

const connectDB = async() =>  {
    try 
    {
        await mongoose.connect(db,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: false
            });
            console.log("connected to DB")
    }
    catch (error) {
        console.error(error.message)
        process.exit(1);
    }
}

module.exports = connectDB;