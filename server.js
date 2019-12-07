const express = require('express')
const app = express()
const port = 3000

const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'notimatch'

// Create a new MongoClient
const client = new MongoClient(url, {useUnifiedTopology: true})

// Use connect method to connect to the Server
client.connect(function(err) {
    if (err) {
        console.error("could not connect to mongo: " + err)
        process.exit()
    }

    console.log("connected to mongo")

    const db = client.db(dbName)

    app.get('/', (req, res) => res.send('Hello World!'))

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))

    // client.close()
})
