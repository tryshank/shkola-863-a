var express = require('express');
var app = express();

app.get('/json', function (req, res) {
    console.log('json');
});

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});
