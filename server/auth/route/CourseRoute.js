const Router = require('express');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');

const mongoose = require('mongoose');

const router = new Router();

const schema = new mongoose.Schema({
  image: String,
  title: String,
  content: String,
  client: String,
  date: String,
  service: String,
  link: String,
  visible: Boolean,
});

const CoursesModel = mongoose.model('courses', schema, 'courses');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/shkola');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to DB');
});

const imagesPath = (`${__dirname}/../../img`);
console.log('reading images in ', imagesPath, '...');
const files = fs.readdirSync(imagesPath);
// filter directories, etc.
const imagesFiles = files.filter(file =>
  fs.statSync(path.join(imagesPath, file)).isFile()
);
console.log('done');


const send404 = (res) => {
  if (!res.headersSent) {
    res.status(404).send({ err: 'id not found' }).end();
  }
};

const send500 = (res, err) => {
  if (!res.headersSent) {
    res.status(500).send({ err }).end();
  }
};

// read courses at client
router.get('/client', (req, res) => {
  CoursesModel.find((err, docs) => {
    if (err) {
      send500(res, err);
    } else {
      res.status(200).json({ docs }).end();
    }
    return null;
  });
});

// read courses at server
router.get('/server', (req, res) => {
  CoursesModel.find((err, docs) => {
    if (err) {
      send500(res, err);
    } else {
      res.status(200).json({ docs, imagesFiles }).end();
    }
    return null;
  });
});


// post/add-create
router.post('/', (req, res) => {
  let doc = req.body.data;
  delete doc._id;
  doc = new CoursesModel(doc);
  doc.save((err, data) => {
    if (err) {
      send500(res, err);
    } else {
      if (data) {
        res.status(200).send({ data }).end();
      } else {
        send500(res, 'item didn\'t saved');
      }
    }
  });
});

// put-edit/update
router.put('/:id', (req, res) => {
  if (req.params.id) {
    console.log('req ', req);
    console.log('_id: ', req.params.id);
    const courseItem = req.body.courseItem;
    console.log('courseItem: ', courseItem);
    delete courseItem._id;
    CoursesModel.update({ _id: req.params.id }, req.body.courseItem, (err) => {
      if (err) {
        send500(res, err);
      } else {
        res.status(200).json({ id: req.params.id, item: req.body.courseItem }).end();
      }
    });
  } else {
    send404(res);
  }
});


// delete
router.delete('/:id', (req, res) => {
  if (req.params.id) {
    CoursesModel.findById(req.params.id, (err, doc) => {
      if (err) {
        send500(res, err);
      } else {
        if (doc) {
          CoursesModel.remove({ _id: req.params.id }, (error) => {
            if (err) {
              send500(res, error);
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


router.post('/image-upload', (req, res) => {
  console.log('image-upload');

  const form = new formidable.IncomingForm();
  form.multiples = false;
  form.uploadDir = path.join(__dirname, '/img');

  form.on('file', (field, file) => {
    fs.rename(file.path, file.path.concat(path.extname(file.name)), (err) => {
      if (err) {
        send500(res, err);
        throw err;
      } else {
        const filename = path.basename(file.path).concat(path.extname(file.name));
        res.status(200).json({ filename }).end();
        imagesFiles.push(filename);
      }
    });
  });

  form.on(' error', (err) => {
    console.log(' An error has occurred: \n ${err}');
    send500(res, err);
  });

  // parse the incoming request containing the form data
  form.parse(req);
});

module.exports = router;
