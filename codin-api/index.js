const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const routes = require('./config/routes')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(routes)

app.listen(8000, () => {
    console.log(`Express started at http://localhost:8000`)
})