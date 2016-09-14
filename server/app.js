let express = require('express');
let app = express();
let mongoose = require('mongoose');
let path = require('path');
let formidable = require('formidable');
let fs = require('fs');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
process.env.NODE_CONFIG_DIR='config';
console.log(`RUNNING ON ENVIRONMENT: ${process.env.NODE_ENV}`);
const config = require('config');

mongoose.Promise = global.Promise;

const imagesPath = path.join(__dirname, '/img');

console.log('reading images in ',imagesPath, '...');

files = fs.readdirSync(imagesPath);
// filter directories, etc.
let imagesFiles = files.filter(file =>
  fs.statSync(path.join(imagesPath, file)).isFile()
);
console.log('done');


const send404 = (res) => {
  if (!res.headersSent)
    res.status(404).send({err: 'id not found'}).end();
};

const send500 = (res, err) => {
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

schema.statics.findById = function(_id, cb) {
  return this.find('{_id}').sort('_id').limit(1).exec(cb);
};


const coursesModel = mongoose.model('courses', schema, 'courses');

mongoose.connect('mongodb://localhost/shkola');
let db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to DB');
});


var bodyParser = require('body-parser');
app.use(morgan('dev'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
  extended: true
}));


const sendHeaders = (res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header('Accept', 'application/json,image/jpeg,image/png,image/gif');
};

app.use(function (req, res, next) {
  sendHeaders(res);
  next();
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});


// read courses at client
app.get('/courses-client', function (req, res) {
  coursesModel.find(function (err, docs) {
    if (err) {
      send500(res,err);
    } else {
      res.status(200).json({docs}).end();
    }
  });
});

// read courses at server
app.get('/courses-server', function (req, res) {
  coursesModel.find(function (err, docs) {
    if (err) {
      send500(res,err);
    } else {
      res.status(200).json({docs, imagesFiles}).end();
    }
  });
});


// post/add-create
app.post('/courses-post/', (req, res) => {
  let doc = req.body.data;
  delete doc._id;
  doc = new coursesModel(doc);
  doc.save((err, doc) => {
    if (err) {
      send500(res,err);
    } else {
      if(doc) {
        res.status(200).send({ data: doc }).end();
      } else {
        send500(res,'item didn\'t saved');
      }
    }
  });

});

// put-edit/update
app.put('/courses-post/:id', (req, res) => {
  if (req.params.id) {
    const courseItem = req.body.courseItem;
    delete courseItem._id;
    coursesModel.update({_id: req.params.id}, req.body.courseItem, (err) => {
      if (err) {
        send500(res, err);
      } else {
        res.status(200).json({id: req.params.id, item: req.body.courseItem}).end();
      }
    });
  } else {
    send404(res);
  }
});


// delete
app.delete('/courses-post/:id', (req, res) => {
  if (req.params.id) {
    coursesModel.findById(req.params.id, (err, doc) => {
      if (err) {
        send500(res, err);
      } else {
        if (doc) {
          coursesModel.remove({_id: req.params.id}, (err) => {
            if (err) {
              send500(res, err);
            } else {
              res.status(200).end();
            }
          });
          res.status(200).end();
        } else {
          send404(res);
        }
      }
    });
  } else {
    send404(res, 'No course id specified');
  }
});


app.post('/image-upload/', function(req, res) {

  console.log('image-upload');

  let form = new formidable.IncomingForm();
  form.multiples = false;
  form.uploadDir = path.join(__dirname, '/img');

  form.on('file', function (field, file) {
    // TODO: remove previous file with same name or old file of the course ?
    // add original extension
    fs.rename(file.path, file.path.concat(path.extname(file.name)), (err) => {
      if (err) {
        send500(res, err);
        throw err;
      } else {
        const filename = path.basename(file.path).concat(path.extname(file.name));
        res.status(200).json({filename}).end();
        imagesFiles.push(filename);
      }
    });
  });

  form.on(' error', function (err) {
    console.log(' An error has occurred: \n' + err);
    send500(res, err);
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

app.use(express.static(`${__dirname}/client`));

console.log('---');
