let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 7230;
let categoryRouter = require('./src/router/categoryRouter');
let productRouter = require('./src/router/productRouter');

//default
app.get('/',function(req,res){
    res.send('HII FROM EXPRESS')
})

app.use('/category',categoryRouter);
app.use('/products',productRouter)

app.listen(port, function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})