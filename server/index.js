const express = require('express')
const app = express()
const BodyParser = require('body-parser')
const cors = require('cors')   // untuk mengubungkan backend ke front end
const fs = require('fs')    // file system

const port = 9008



app.use(cors())
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())  // untuk client ngirim ke server
app.use(express.static('public'))


const {
    taskmanRouter
} = require('./router')

app.use('/taskman', taskmanRouter)

app.get('/', (req, res) => { return res.status(200).send('<h1>server workdone</h1>') })
app.listen(process.env.port || port, () => console.log(`API AKTIF DI ${port}`))