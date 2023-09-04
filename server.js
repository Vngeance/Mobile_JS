const express = require('express');
const fs = require('fs');
const bP = require('body-parser');
const  dir = __dirname;
const dirPub = dir+'/public/html/';
const dirScript = dir + '/public/'

const config = require('./config.json')

let port = config.port

let app = express();

app.use(bP.urlencoded({extended:false}))
app.use(bP.json())
app.use((req,res,next)=>{
    let now = new Date();
    console.log(`[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`+' '+(req.method)+' '+(req.url))
    next()
})

app.route('/')
    .get((req,res)=>{
        res.status(200);
        res.sendFile(dirPub + 'index.html')
        res.end
    })

app.route('/js/*')
    .get((req,res)=>{
        res.status(200)
        res.sendFile(dirScript+req.url)
        res.end
    })

app.route('/css/*')
    .get((req,res)=>{
        res.status(200)
        res.sendFile(dirScript+req.url)
        res.end
    })

app.listen(port, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log(`server start on ${port}`);
})
