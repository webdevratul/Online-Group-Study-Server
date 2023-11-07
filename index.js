const express = require('express');
const cors = require("cors");
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 200;


// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uxcjhbh.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const assignmentCollection = client.db("OnlineGroupStudyAssignment").collection("assignment");

        app.post("/createAssignment", async (req, res) => {
            const createAssignmentData = req.body;
            const result = await assignmentCollection.insertOne(createAssignmentData);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected to MongoDB");

    } finally {
        // Ensures that the client will close when you finish/error
        /* await client.close(); */
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Online Group StudY Server is Running');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

