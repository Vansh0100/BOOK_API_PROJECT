const mongoose=require('mongoose');

const BookSchema=new mongoose.Schema(
    {
        ISBN:String,
        title:String,
        authors:[Number],
        language:String,
        pubDate:String,
        numOfPage:Number,
        category:[String],
        publications:Number
    }
);



const BookModel=mongoose.model("books",BookSchema);


module.exports=BookModel;