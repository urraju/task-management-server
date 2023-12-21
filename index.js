const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zrkwx23.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const  taskCollection = client.db("taskDB").collection("task");
    
    app.post('/task', async(req,res) => {
      const query = req.body
      const result = await taskCollection.insertOne(query)
      res.send(result)
    })
    app.get('/task', async(req,res) => {
      const result = await taskCollection.find().toArray()
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
     
  }
}
run().catch(console.dir);




app.get("/", async (req, res) => {
    res.send("Server is Running");
  });
  app.listen(port, () => {
    console.log("Server is Running on PORT ||", port);
  });
  