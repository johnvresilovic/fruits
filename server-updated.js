require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');

const Fruit = require('./models/fruits.js')
// Set up middleware

app.use((req, res, next) => {
    console.log('I run for all routes')
    next()
})

app.use(express.urlencoded({extended:false}))

app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

// Setting up Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.once('open', ()=> {
    console.log('connected to mongo')
})
mongoose.set('strictQuery', true)

// Index route = Show all records
app.get('/fruits', (req,res) => {
Fruit.find({}, (error, allFruits)=> {
    res.render('Index', {
        fruits: allFruits // getting all fruis from db to pass as props
    })
})
})

// New - Get a form to create a new record
app.get('/fruits/new', (req,res) =>{
    res.render('New')
})
// Delete - Delete this one record

// Update - Modifying a record

// Create - send the filled form to db and create a new record
app.post('/fruits', (req,res) => {
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false //do some data correction
    }

    Fruit.create(req.body, (error, createdFruit) => {
        res.redirect('/fruits')
    })
    
})
// Edit - Get the form with the record to update

// Show route - Show me a particular record
app.get('/fruits/:indexOfFruitsArray', function(req, res){
    Fruit.findById(req.params.indexOfFruitsArray, (err, foundFruit)=> {
        res.render('Show', {
            fruit: foundFruit
        })
    })
})
app.listen(port, () => {
    console.log('listening')
})