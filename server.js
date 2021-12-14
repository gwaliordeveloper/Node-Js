
const express=require("express");
const mysql = require("mysql");
const bodyParser=require("body-parser");

var app = express();

app.use(bodyParser.json());

var mySqlCreateConnection =mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"nodetest",
    //multipleStatements:true
});

mySqlCreateConnection.connect((err)=>{
    if(!err){
        console.log("Connection Success");
        //console.log(app.listen(3000));
    }else{
        console.log("Connection Failed");   
    }
});


app.get('/usersData',(req,res)=>{
   mySqlCreateConnection.query('select * from UserData' ,(err,result)=>{
        if(!err){
            res.send(result);
        }else{
            console.log(err);
        }
   })
});

app.get('/usersData/:id',(req,res)=>{
    mySqlCreateConnection.query('select * from UserData where id=?',[req.params.id] ,(err,result)=>{
         if(!err){
             res.send(result);
         }else{
             console.log(err);
         }
    })
 });

 app.post('/usersData/insertUser',(req,res)=>{ 
     const params = req.body
    mySqlCreateConnection.query('INSERT INTO UserData set ?', params ,(err,result)=>{
         
        if(!err){
             res.send(`id : ${params.id} has`);
         }else{
             console.log(err);
         }
    })
 });

app.listen(3000);
