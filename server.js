const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('currentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
    //checkout home.hbs
});


app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFileSync('server.log',log + '\n',(err) => {
        if(err) {
            console.log(err);
        }
    });
    console.log(log);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs',{
//         description: 'This Site is Under Maintenance !!! So Go Away !!!'
//     });
// });

app.get('/',(req, res) => {
    // res.send('<h1>Hello Express !!!</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        description: `Ain't no crying in the club !!! - by camila cabello`
    });
});

app.get('/about',(req, res) => {
    // res.send('This is may be about page !!!');
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/bad',(req, res) => {
    res.send({
        errorMessage: 'Unable to open page !!!'
    });
});

app.listen(port, () => {
    console.log(`Server is Listning on ${port}`);
});