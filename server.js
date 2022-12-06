const express = require('express');
const app = express();
const port = 3000;
const fruits = require('./models/fruits.js');

//Middleware
app.use((req, res, next) => {
    console.log('All play and no work makes Jacky a happy boy');
    next();
});
app.use(express.urlencoded({extended:false}));

//Set up view engine
app.set('view engine', 'jsx');
  app.engine('jsx', require('express-react-views').createEngine());

//INDUCES begins here
//Index
  app.get('/fruits', function(req, res){
    res.render('Index', { fruits: fruits });
});

//New - retrieve a form to create a new record - HTML get
app.get('/fruits/new', (req, res) => {
    res.render('New');
});

app.post('/fruits', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
    res.redirect('/fruits'); //send the user back to /fruits
});

//Delete
//Update - update record from db - HTML post
//Create - send filled out form to db to create new record - HTML post
//Edit - retrieve record to be updated from db - HTML get

//Show
app.get('/fruits/:indexOfFruitsArray', function(req, res){
    res.render('Show', {fruit: fruits[req.params.indexOfFruitsArray] 
    });
});

app.listen(port, () => {
    console.log(port + ' is listening');
});