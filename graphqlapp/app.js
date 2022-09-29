const express = require('express');
const app = express();
const port = 8600;
const {graphqlHTTP} = require('express-graphql');
const schema = require('./Schema/schema');

app.use(
    '/graphql',
    graphqlHTTP({
        schema:schema,
        graphiql:true
    })
)

app.listen(port,() => {
    console.log(`Running on port ${port}`)
})