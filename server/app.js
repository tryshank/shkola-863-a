let express = require('express');
let app = express();
let mongoose = require('mongoose');
let coursesData;

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

let Model = mongoose.model('Courses',schema,'courses');

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

app.get('/courses', function (req, res) {
    Model.find(function (err, docs) {
        if (err) return console.error(err);
        coursesData = docs;
        console.log('courses json');
        res.json(coursesData);
    });
});

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});
