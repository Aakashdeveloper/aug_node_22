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
    let mealId = Number(req.query.mealId)
    if(stateId && mealId){
        query = {'state_id':stateId,'mealTypes.mealtype_id':mealId}
    }
    else if(stateId){
        query = {'state_id':stateId}
    }else if(mealId){
        query = {'mealTypes.mealtype_id':mealId}
    }else{
        query = {} 
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

//filters
app.get('/filters/:mealId',(req,res) => {
    let query = {}
    let sort = {cost:1}
    let skip = 0;
    let limit = 100000000000;
    let mealId =Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisineId);
    let lcost = Number(req.query.lcost)
    let hcost = Number(req.query.hcost)
    if(req.query.sort){
       sort={cost:req.query.sort} 
    }
    if(req.query.skip && req.query.limit){
        skip = Number(req.query.skip)
        limit = Number(req.query.limit)
    }
    if(cuisineId){
        query={'mealTypes.mealtype_id':mealId,'cuisines.cuisine_id':cuisineId}
    }else if(lcost && hcost){
        query={
            'mealTypes.mealtype_id':mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    db.collection('restaurants').find(query).sort(sort).skip(skip).limit(limit).toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

//restaurants details
app.get('/details/:id',(req,res)=>{
    let restaurant_id = Number(req.params.id);
    //let _id = mongo.ObjectId(req.params.id);
    db.collection('restaurants').find({restaurant_id}).toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

//menu wrt to restaurants
app.get('/menu/:id',(req,res)=>{
    let restaurant_id = Number(req.params.id);
    db.collection('menu').find({restaurant_id}).toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

// menu wrt to ids
app.post('/menuItem',(req,res) => {
    if(Array.isArray(req.body)){
        db.collection('menu').find({menu_id:{$in:req.body}}).toArray((err,data) => {
            if(err) throw err;
            res.send(data)
        })
    }else{
        res.send('Please Enter Array Only')
    }
})

//placeOrder
app.post('/placeOrder',(req,res) => {
    db.collection('orders').insert(req.body,(err,data) => {
        if(err) throw err;
        res.send('Order Placed')
    })
})


app.get('/getOrder',(req,res) => {
    let query = {}
    if(req.query.email){
        query = {email:req.query.email}
    }
    db.collection('orders').find(query).toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

//remove orders
app.delete('/removeOrder',(req,res) => {
    let id = mongo.ObjectId(req.body._id)
    db.collection('orders').find({_id:id}).toArray((err,data) => {
       if(data.length != 0){
        db.collection('orders').remove({_id:id},(err,result) =>{
            res.send('Order Deleted')
        })
       }else{
        res.send('No Result Found')
       }
    })
})

// Delete Order
app.delete('/removeAllOrder',(req,res) => {
    db.collection('orders').remove({},(err,result) =>{
        res.send('Order Deleted')
    })
})


// Update Orders
app.put('/updateOrder',(req,res) => {
    db.collection('orders').updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set: {
                "status":req.body.status
            }
        },(err,result)=>{
            if(err) throw err;
            res.status(200).send('Status Updated')
        }
    )
})


MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log('Error While Connecting')
    db = client.db('augintern')
    app.listen(Port,()=>{
        console.log(`Listing to port ${Port}`)
    })
})


