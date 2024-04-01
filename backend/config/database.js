const mongoose= require("mongoose");

require("dotenv").config();

exports.connect= () =>{
        mongoose.connect("mongodb+srv://Kadam:adminpass@cluster0.b5qwliy.mongodb.net/VirtuLearn?retryWrites=true&w=majority&appName=Cluster0")
        .then(()=>{
            console.log("DB CONNECTED SUCCESSFULLY")
        })
        .catch((error)=>{
            console.log("DB CONNECTION FAILED");
            console.log(error);
            process.exit(1);
        });
};
