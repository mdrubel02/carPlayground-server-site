const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000 

app.use(cors())
app.use(express.json())

//carUser01
//Uw1W2TIi1JIw8D1r


const uri = "mongodb+srv://carUser01:Uw1W2TIi1JIw8D1r@cluster0.urwm801.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(error=>console.error(error))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port,()=>{
    console.log(`carPlayground server is running on ${port}`)
})