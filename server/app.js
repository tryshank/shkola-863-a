let express = require('express');
let app = express();
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const send404 = (res) => {
  if (!res.headersSent)
    res.status(404).send({err: 'id not found'}).end();
};

const send500 = (res, err) => {
  console.log(err);
  if (!res.headersSent)
    res.status(500).send({err: err}).end();
};

let schema = new mongoose.Schema({
  image: String,
  title: String,
  content: String,
  client: String,
  date: String,
  service: String,
  link: String
});

schema.statics.findById = function(cb) {
  return this.find().sort('divId').limit(1).exec(cb);
};

var coursesModel = mongoose.model('courses', schema);

mongoose.connect('mongodb://localhost/shkola');
let db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to DB');
});


var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
  extended: true
}));


const sendHeaders = (res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header('Accept', 'application/json');
};

app.use(function (req, res, next) {
  sendHeaders(res);
  next();
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});


// read
app.get('/courses-json', function (req, res) {
  coursesModel.find(function (err, docs) {
    if (err) {
      res.status(500).send(err).end();
      console.error(err);
    } else {
      console.log('courses json');
      res.status(200).json(docs).end();
    }
  });

});

// post/add-create
app.post('/courses-post/', (req, res) => {
  console.log('courses-post');

  console.log(req.params);

  let doc = new coursesModel(req.body);
  delete doc.id;
  console.log('add new');

  doc.save((err, doc) => {
    if (err) {
      send500(res,err);
    } else {
      if(doc) {
        res.status(200).send({ doc: doc }).end();
      } else {
        send500(res,'item didn\'t saved');
      }
    }
  });

});

// put-edit/update
app.put('/courses-post/:id', (req, res) => {
  console.log('courses-put');
  if (req.params.id) {
    coursesModel.findById(req.params.id, (err, doc) => {
      if (err) {
        send500(res, err);
      } else {
        if (doc) {
          doc.image = req.body.image;
          doc.title = req.body.title;
          doc.content = req.body.content;
          doc.client = req.body.client;
          doc.date = req.body.date;
          doc.service = req.body.service;
          doc.link = req.body.link;
          doc.save((err) => {
            if (err) {
              send500(res, err);
            } else {
              console.log('saved');
              res.status(200).end();
            }
          });
        } else {
          console.log('id "' + req.params.id + '" not found');
          send404(res);
        }
      }
    });
  }

  res.end();
});


// delete
app.delete('/courses-post/:id', (req, res) => {
  console.log('courses-put');

  if (req.params.id) {
    coursesModel.findById(req.params.id, (err, doc) => {
      if (err) {
        send500(res, err);
      } else {
        if (doc) {
          doc.remove((err) => {
            if (err) {
              send500(res,err);
            } else {
              console.log('deleted');
              res.status(200).end();
            }
          });
        } else {
          console.log('id "' + req.params.id + '" not found');
          send404(res);
        }
      }
    });
  }

});


console.log('---');
