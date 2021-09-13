const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://singh:test123@cluster1.s8pvv.mongodb.net/graphql?retryWrites=true&w=majority')

mongoose.connection.once('open', ()=>{
    console.log('connected to database');
})

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000,()=>{
    console.log("Listening for request on port 4000");
});