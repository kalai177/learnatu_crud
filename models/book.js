import  mongoose  from "mongoose";
const userschema=new mongoose.Schema({
    title:{type:String,required:true},
    bookname:{type:String,required:true},
    author:{type:String,required:true},
    pages:{type:String,required:true},
    genre:{type:String,required:true},
    about_the_book:{type:String,required:true}
})
const Book=mongoose.model('books',userschema);
export default Book