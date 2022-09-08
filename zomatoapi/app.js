let express = require('express');
let app = express();
let mongo = require('mongodb');
let cors = require('cors');
let bodyParser = require('body-parser');
let dotenv = require('dotenv');
dotenv.config()
let Port = process.env.PORT || 7100;
let mongoUrl = process.env.mongoLiveUrl;
let db;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// heartbeat
app.get('/',(req,res) => {
    res.status(200).send('APi Working fine')
})



MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log('Error While Connecting')
    db = client.db('augintern')
    app.listen(port,()=>{
        console.log(`Listing to port ${port}`)
    })
})