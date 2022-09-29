let graphql = require('graphql');
let axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema
} = graphql

const ProductType = new GraphQLObjectType({
    name:'Products',
    fields:{
        id: {type:GraphQLInt},
        product_name: {type:GraphQLString},
        category: {type:GraphQLString},
        category_id: {type:GraphQLInt},
        Price: {type:GraphQLInt},
        Size: {type:GraphQLString},
        Image: {type:GraphQLString},
        Color: {type:GraphQLString},
        Brand: {type:GraphQLString},
    }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        Products:{
            type:ProductType,
            args:{id:{type:GraphQLInt}},
            resolve(parentValue, args){
                return axios.get(`http://localhost:8700/products/${args.id}`)
                .then((res) =>  res.data)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addProducts:{
           type:ProductType,
           args:{
            id: {type: new GraphQLNonNull(GraphQLInt)},
            product_name: {type:GraphQLString},
            category: {type:GraphQLString},
            category_id: {type:GraphQLInt},
            Price: {type:GraphQLInt},
            Size: {type:GraphQLString},
            Image: {type:GraphQLString},
            Color: {type:GraphQLString},
            Brand: {type:GraphQLString}
           } ,
           resolve(parentValue,{id,product_name,category,category_id,Price,Size,Image,Color,Brand}){
            return axios.post(`http://localhost:8700/products/`,{id,product_name,category,category_id,Price,Size,Image,Color,Brand})
            .then((res) => res.data)
            }
        }
        
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
})

/*
{
  Products(id:8){
    product_name,
    category
  }
}
mutation{
  addProducts(
    id:59,
    product_name:"Test product59",
  ){
    id
  }
}
*/