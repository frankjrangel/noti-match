const express = require('express')
const app = express()
const port = 3000

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'notimatch'
const client = new MongoClient(url, {useUnifiedTopology: true})

const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use((req, res, next) => {
    res.header('content-type', 'application/json')
    next()
})

const newsController = require('./newsController')

// Use connect method to connect to the Server
client.connect(function(err) {
    if (err) {
        console.error("could not connect to mongo: " + err)
        process.exit()
    }

    console.log("connected to mongo")

    const db = client.db(dbName)
    const nc = newsController(db)

    app.post('/news', nc.store)
    app.get('/news', nc.get)

    app.get('/', (req, res) => res.send('Hello World!'))

    app.listen(port, () => console.log(`listening on port: ${port}`))

    // client.close()
})
