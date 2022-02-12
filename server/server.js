const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const MyGraphQLSchema = require('./schema')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

mongoose.createConnection(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
mongoose.connection.once('open', function (){
  console.log('Connected to MongoDB')
})
.on("error", function (error) {
  console.log("error is:", error);
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  }),
)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`The server started on port ${PORT}`)
})
