const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log=`${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if (err){
            console.log('Can not append to ');
        }
    })

    next();
})
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return  new Date().getFullYear()
});

hbs.registerHelper('screamIt',(test)=>{
    return test.toUpperCase();
})

app.get('/', (req, res) => {

  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});