// mongodb://127.0.0.1:27017/

const mongoose = require('mongoose');
const db = "mongodb://dbuser:Qwerty1234@cluster0-shard-00-00.jn6ue.azure.mongodb.net:27017,cluster0-shard-00-01.jn6ue.azure.mongodb.net:27017,cluster0-shard-00-02.jn6ue.azure.mongodb.net:27017/calkulator?ssl=true&replicaSet=atlas-xzzzg1-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectDB = async() =>  {
    try 
    {
        await mongoose.connect(db,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            });
            console.log("connected to DB")
    }
    catch (error) {
        console.error(error.message)
        process.exit(1);
    }
}

module.exports = connectDB;