const mongoose = require("mongoose");


const connection= async()=>{
    mongoose.connect(process.env.MONGO_URL,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
}

module.exports=connection;