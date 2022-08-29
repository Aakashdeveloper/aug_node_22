let express = require('express');
let categoryRouter = express.Router();
let mongodb = require('mongodb').MongoClient;
let url = process.env.MONGOURL

function router(menu){
    // default route for category
    categoryRouter.route('/')
        .get(function(req,res){
            mongodb.connect(url,function(err,dc){
                if(err){
                    res.status(500).send('Error while connecting')
                }else{
                    let dbObj = dc.db('aug9');
                    dbObj.collection('category').find().toArray(function(err,result){
                        if(err){
                            res.status(203).send('Error while fetching')
                        }else{
                            res.render('category',{title:'Category Page',data:result,menu:menu})
                        }
                    })
                }
            })
            //res.send(category) 
        })

    // details route for category   
    categoryRouter.route('/details')
        .get(function(req,res){
            res.send('Category Details')
        })

    return categoryRouter
}



module.exports = router