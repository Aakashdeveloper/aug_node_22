let express = require('express');
let app = express();
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let cors = require('cors');
let bodyParser = require('body-parser');
let dotenv = require('dotenv');
dotenv.config()
let Port = process.env.PORT || 7100;
let mongoUrl = process.env.mongoLiveUrl;
let db;
let authKey = process.env.authKey;
// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

function auth(key){
    if(key == authKey){
        return true
    }else{
        return false
    }
}

// heartbeat
app.get('/',(req,res) => {
    res.status(200).send('APi Working fine')
})


// list of City
app.get('/location',(req,res) => {
    //let key = req.query.key;
    //let {key} = req.query;
    let key = req.header('x-basic-token')
    if(auth(key)){
        db.collection('location').find().toArray((err,data) => {
            if(err) throw err;
            res.send(data)
        })
    }else{
        res.send('Unauthenticated Requested')
    }
})

//restaurant
app.get('/restaurants',(req,res) => {
    let query = {}
    let stateId = Number(req.query.stateId)
    if(stateId){
        query = {'state_id':stateId}
    }
    db.collection('restaurants').find(query).toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

//mealType
app.get('/mealType',(req,res) => {
    db.collection('mealType').find().toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})



MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log('Error While Connecting')
    db = client.db('augintern')
    app.listen(Port,()=>{
        console.log(`Listing to port ${Port}`)
    })
})


