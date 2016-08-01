let express = require('express');
let app = express();
let mongoose = require('mongoose');
let portfolioData;

const schema = new mongoose.Schema({
    id: {type: String, unique: true, index: true},
    divId: String,
    image: String,
    title: String,
    content: String,
    client: String,
    date: String,
    service: String,
    link: String
});

let Model = mongoose.model('Portfolio',schema,'portfolio');

mongoose.connect('mongodb://localhost/shkola');
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to DB');
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

app.get('/portfolio', function (req, res) {
    Model.find(function (err, docs) {
        if (err) return console.error(err);
        portfolioData = docs;
        console.log('portfolio json');
        res.json(portfolioData);
    });
});

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});
