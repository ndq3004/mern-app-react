import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
// import router
import posts from './routers/post.js'

const app = express()
const PORT = process.env.port || 5000
const MONGO_URI = 'mongodb+srv://ndq3004:30041998@cluster0.cdc770u.mongodb.net/?retryWrites=true&w=majority'

app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}))
app.use(cors())

app.use('/posts', posts)

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('connected to mongo db!')
        })
        .catch(err => {
            console.log(err)
        })

app.get('/', (req, res) => {
    res.send("Success")
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})