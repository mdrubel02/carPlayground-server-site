// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
var jwt = require('jsonwebtoken');
const app = express()
const port = process.env.PORT || 5000 

app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port,()=>{
    console.log(`carPlayground server is running on ${port}`)
})