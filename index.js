import express from "express";
const app=express();
import path from "path/posix";
import  mongoose  from "mongoose";
const url="mongodb+srv://KALAIYARASI:Y5ZETyjBJfmcxo@learnatudb.xvgqc.mongodb.net/learnatudb?retryWrites=true&w=majority"
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(url, connectionParams)
    .then(() => {
      console.log("Connected to database ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });
const port = process.env.PORT || 3000;

import Book from "./models/book.js"

app.post('/book/createbook',express.json(),async(req,res)=>{
        const{bookname,author,pages,genre,about_the_book}=req.body;
        const title="Book"
        try{
            console.log("createbook");
            const data= await Book.create({
                title,
                bookname,
                author,
                pages,
                genre,
                about_the_book
            })
            console.log(data);
            return res.json({status:"ok"})
        }
        catch(error){
            console.log(error);
            return res.json({status:"error",error:"can't able to create"})
        }
})

app.get("/books", express.json(),async(res,req)=>{
    const title="Book"
     return Book.find({},function(err,books){
       if(!err){
         res.render('home',{books:books})
       }
       else{
         console.log(err)
       }
     })
})

app.put("/books/update/:id",express.json(),async(req,res)=>{
  const{id,bookname,author,pages,genre,about_the_book}=req.body;
     try{
       const data=await  Book.findByIdAndUpdate({_id:id},{
         bookname:bookname,
         author:author,
         pages:pages,
         genre:genre,
         about_the_book:about_the_book
       })
       return res.json({status:"ok"})
     }
     catch(error){
       console.log(error)
       return res.json({status:"error", error:error})
     }
})


app.delete("/books/delete/:id", express.json(),async(req,res)=>{
  console.log(req.body.id);
  try {
    const data = await Book.findByIdAndDelete({ _id: req.body.id });
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "failed to delete" });
  }
})

app
  .listen(port, function () {
    console.log("success http://localhost:3000/");
  })
  .on("error", function (error) {
    console.log(error);
  });