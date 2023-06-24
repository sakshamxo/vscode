const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));
app.get('/',function(req,res){
    fs.readdir('./uploads',function(err,data){
        if(err) throw err;
        res.render('index',{files:data})
    })
});
app.get('/files/:filename',function(req,res){
    fs.readdir('./uploads',function(err,data){
        if (err) throw err;
        fs.readFile(path.join(__dirname,"./uploads/" + req.params.filename),'utf-8', function(err,datafile){
            res.render('index2',{filename:req.params.filename, files:data, filesdata:datafile})
        })
    })
});
app.get('/newfile',function(req,res){
    fs.writeFile(`./uploads/${req.query.filename}`,"",function(err){
        res.redirect('/')
    })
})
app.get('/newfolder',function(req,res){
    fs.mkdir(`./uploads/${req.query.foldername}`,function(err){
        res.redirect('/')
    })
})
app.get('/delete/:filename',function(req,res){
    fs.unlink(path.join(__dirname,"./uploads/"+ req.params.filename),function(err){
        res.redirect('/')
    })
})
app.get('/save/:filename',function(req,res){
    fs.writeFile(`./uploads/${req.params.filename}`,req.query.savedata,function(err){
        res.redirect(req.headers.referer)
    })
})

app.listen(3000);