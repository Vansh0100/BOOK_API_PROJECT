const mongoose=require('mongoose');

const AuthorSchema=new mongoose.Schema(
    {
        id:Number,
        name:String,
        books:[String]
    }
)

const AuthorModel=mongoose.model("author",AuthorSchema);
module.exports=AuthorModel;