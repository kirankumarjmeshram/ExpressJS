const express = require("express");
const app = express();
app.use(logger);
//REST API
//get => to get item from server
//post =>
//put =>
//delete =>

app.get("/",(req,res)=>{
    return res.send({name:"googke.com"})
})

app.get("/users",(req,res)=>{
    return res.send("All users")
})

//middleware
function logger(req,res,next){
    console.log("one");
    console.log("two");
    next();//jump to app.use() and read lines after app.use()
}

app.listen(5555,()=>{
    console.log("Listening on port 5555")
});