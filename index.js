const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const productsCollection = client.db("CarPlayground").collection("products");


    app.get('/products', async (req, res) => {
      const productSize = parseInt(req.query.productSize)
      const pageSize = parseInt(req.query.pageSize)
      const size = parseInt(req.query.size)
      let result = []
      if (size) {
        result = await productsCollection.find().sort({ _id: -1 }).limit(size).toArray()
      }
      else {
        result = await productsCollection.find({}).skip(pageSize * productSize).limit(productSize).toArray()
      }

      const count = await productsCollection.count()
      res.send({
        count: count,
        status: true,
        data: result
      })
    })
    // add a new car product
    app.post("/products", async (req, res) => {
      const service = req.body
      const result = await productsCollection.insertOne(service)
      res.send(result)
    })
    //Get the my toys product
    app.get("/myToys", async (req, res) => {
      const emailAdd = req.query.email
      const query = { email: emailAdd }
      const result = await productsCollection.find(query).sort({ price: -1 }).toArray()
      res.send({
        status: true,
        data: result
      })
    })
    // get the audi product
    app.get('/audi', async (req, res) => {
      const result = await productsCollection.find({ brand: 'Audi' }).toArray()
      res.send({
        status: true,
        data: result
      })
    })
    // get the toyota product
    app.get('/toyota', async (req, res) => {
      const result = await productsCollection.find({ brand: 'Toyota' }).toArray()
      res.send({
        status: true,
        data: result
      })
    })
    // get the ford product
    app.get('/ford', async (req, res) => {
      const result = await productsCollection.find({ brand: 'Ford' }).toArray()
      res.send({
        status: true,
        data: result
      })
    })
    // get the single details  product
    app.get("/details/:id", async (req, res) => {
      const id = req.params.id
      console.log(id);
      const result = await productsCollection.findOne({ _id: new ObjectId(id) })
      res.send({
        status: true,
        data: result
      })
    })
    // update product
    app.patch('/updateProduct/:id', async (req, res) => {
      const id = req.params.id
      const product = req.body
      const filter = { _id: new ObjectId(id) }
      const updateReview = {
        $set: product
      }
      const result = await productsCollection.updateOne(filter, updateReview)
      res.send(result)
    })
    //delete product
    app.delete("/deleteProduct/:id",async(req,res)=>{
      const id = req.params.id 
      const query = {_id: new ObjectId(id)}
      const result = await productsCollection.deleteOne(query)
      res.send(result)
  })
  
  } finally {

  }
}
run().catch(error => console.error(error))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`carPlayground server is running on ${port}`)
})