const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const formidable = require('formidable')
const app = express();
const port = process.env.PORT || 8970;

//static file path
app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs')

app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.render('index')
})

app.post('/upload',(req,res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, function(err,field,files){
        let oldPath = files.uimg.filepath;
        let newpath = `${__dirname}/public/images/${files.uimg.originalFilename}`
        fs.rename(oldPath,newpath,function(err){
            if(err) throw err;
            res.render('display',{title:req.body.uname,image:`${files.uimg.originalFilename}`})
        })
    })
})


app.listen(port,(err) => {
    console.log(`Server is running on port ${port}`)
})