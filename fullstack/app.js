let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 7230;
let morgan = require('morgan');
let fs = require('fs');
// let helmet = require('helmet')

//middleware
app.use(morgan('short',{stream:fs.createWriteStream('./app.log')}))
// app.use(helmet()) //https://www.npmjs.com/package/helmet
// app.use(helmet.xssFilter());

let menu = [
    {link:'/',name:'Home'},
    {link:'/category',name:'Category'},
    {link:'/products',name:'Products'}
]

let categoryRouter = require('./src/router/categoryRouter')(menu);
let productRouter = require('./src/router/productRouter')(menu);


//static file path
app.use(express.static(__dirname+'/public'))
// html file path
app.set('views','./src/views')
// view engine name
app.set('view engine','ejs')

//default
app.get('/',function(req,res){
    //res.send('<h1>HII FROM EXPRESS</h1>')
    res.render('index',{title:'Home Page',menu})
})

app.use('/category',categoryRouter);
app.use('/products',productRouter)

app.listen(port, function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})