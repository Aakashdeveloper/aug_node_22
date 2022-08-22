let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 7230;
let categoryRouter = require('./src/router/categoryRouter');
let productRouter = require('./src/router/productRouter');

//static file path
app.use(express.static(__dirname+'/public'))
// html file path
app.set('views','./src/views')
// view engine name
app.set('view engine','ejs')

//default
app.get('/',function(req,res){
    //res.send('<h1>HII FROM EXPRESS</h1>')
    res.render('index',{title:'Home Page'})
})

app.use('/category',categoryRouter);
app.use('/products',productRouter)

app.listen(port, function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})