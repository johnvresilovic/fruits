require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 3000;
const Fruit = require('./models/fruits.js')

//Set up middleware
app.use((req, res, next) => {
    console.log('All play and no work makes Jacky a happy boy')
    next()
});
app.use(express.urlencoded({extended:false}))

//Set up view engine
app.set('view engine', 'jsx')
  app.engine('jsx', require('express-react-views').createEngine())

//Set up Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.connection.once('open', ()=> {
      console.log('connected to mongo')
  })

//INDUCES begins here
//Index
  app.get('/fruits', function(req, res){
    Fruit.find({}), (error, allFruits)=> {
        res.render('Index', {
            fruits: allFruits
        })
    }
})

//New - retrieve a form to create a new record - HTML get
app.get('/fruits/new', (req, res) => {
    res.render('New')
})

//Delete

//Update - update record from db - HTML post

//Create - send filled out form to db to create new record - HTML post
app.post('/fruits/', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false
    }
    Fruit.create(req.body, (error, createdFruit)=>{
        res.send(createdFruit);
    })
})

//Edit - retrieve record to be updated from db - HTML get

//Show
app.get('/fruits/:id', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.send(foundFruit);
    });
})

app.listen(port, () => {
    console.log(port + ' is listening')
})