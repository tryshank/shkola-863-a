var express = require('express');
var app = express();

let portfolioData = [
    {
        id: 1,
        divId: 'portfolioModal1',
        image: 'src/img/portfolio/cabin.png',
        title: 'Project Title',
        content: 'Use this area of the page to describe your project. The icon above is part of a free icon set by <a href=\"https://sellfy.com/p/8Q9P/jV3VZ/\">Flat Icons</a>. On their website, you can download their free set with 16 icons, or you can purchase the entire set with 146 icons for only $12!',
        client: 'Start Bootstrap',
        date: 'April 2014',
        service: 'Web Development',
        link: 'http://startbootstrap.com'
    }, {
        id: 2,
        divId: 'portfolioModal2',
        image: 'src/img/portfolio/cake.png',
        title: 'Project Title',
        content: 'Use this area of the page to describe your project. The icon above is part of a free icon set by <a href=\"https://sellfy.com/p/8Q9P/jV3VZ/\">Flat Icons</a>. On their website, you can download their free set with 16 icons, or you can purchase the entire set with 146 icons for only $12!',
        client: 'Start Bootstrap',
        date: 'April 2014',
        service: 'Web Development',
        link: 'http://startbootstrap.com'
    }, {
        id: 3,
        divId: 'portfolioModal3',
        image: 'src/img/portfolio/circus.png',
        title: 'Project Title',
        content: 'Use this area of the page to describe your project. The icon above is part of a free icon set by <a href=\"https://sellfy.com/p/8Q9P/jV3VZ/\">Flat Icons</a>. On their website, you can download their free set with 16 icons, or you can purchase the entire set with 146 icons for only $12!',
        client: 'Start Bootstrap',
        date: 'April 2014',
        service: 'Web Development',
        link: 'http://startbootstrap.com'
    }, {
        id: 4,
        divId: 'portfolioModal4',
        image: 'src/img/portfolio/game.png',
        title: 'Project Title',
        content: 'Use this area of the page to describe your project. The icon above is part of a free icon set by <a href=\"https://sellfy.com/p/8Q9P/jV3VZ/\">Flat Icons</a>. On their website, you can download their free set with 16 icons, or you can purchase the entire set with 146 icons for only $12!',
        client: 'Start Bootstrap',
        date: 'April 2014',
        service: 'Web Development',
        link: 'http://startbootstrap.com'
    }, {
        id: 5,
        divId: 'portfolioModal5',
        image: 'src/img/portfolio/safe.png',
        title: 'Project Title',
        content: 'Use this area of the page to describe your project. The icon above is part of a free icon set by <a href=\"https://sellfy.com/p/8Q9P/jV3VZ/\">Flat Icons</a>. On their website, you can download their free set with 16 icons, or you can purchase the entire set with 146 icons for only $12!',
        client: 'Start Bootstrap',
        date: 'April 2014',
        service: 'Web Development',
        link: 'http://startbootstrap.com'
    }, {
        id: 6,
        divId: 'portfolioModal6',
        image: 'src/img/portfolio/submarine.png',
        title: 'Project Title',
        content: 'Use this area of the page to describe your project. The icon above is part of a free icon set by <a href=\"https://sellfy.com/p/8Q9P/jV3VZ/\">Flat Icons</a>. On their website, you can download their free set with 16 icons, or you can purchase the entire set with 146 icons for only $12!',
        client: 'Start Bootstrap',
        date: 'April 2014',
        service: 'Web Development',
        link: 'http://startbootstrap.com'
    }
];


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

app.get('/json', function (req, res) {
    console.log('json');
    res.json(portfolioData);
});

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});
