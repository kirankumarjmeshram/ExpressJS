const express = require("express");
const app = express();
app.use(logger);
//app.use(oneMorelogger);
//REST API
//get => to get item from server
//post =>
//put =>
//delete =>

app.get("/",(req,res)=>{
    console.log("Route Handler")
    return res.send({name:req.name})
})
//app.use(oneMorelogger);

//inline middleaware
app.get("/users",oneMorelogger,(req,res)=>{
    return res.send("All users")
})

app.get("/abc",(req,res)=>{
    return res.send("All users")
})

//middleware
function logger(req,res,next){
    req.name ="Kirankumar"
    console.log("one");
    console.log("Before");
    next();//jump to net line of app.use() and read lines after app.use()
    console.log("After")
}

function oneMorelogger(req,res,next){
    console.log("Before One More");
    next();
    console.log("After One More")
}


app.listen(5555,()=>{
    console.log("Listening on port 5555")
});