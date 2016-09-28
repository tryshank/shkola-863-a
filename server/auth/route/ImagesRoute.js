const Router = require('express');
const path = require('path');
const { ensureAuthenticated } = require('../middleware/AuthMiddleware');
const fs = require('fs');
const formidable = require('formidable');

const router = new Router();

const imagesPath = (`${__dirname}/../../img`);
console.log('reading images in ', imagesPath, '...');
const files = fs.readdirSync(imagesPath);
// filter directories, etc.
const imagesFiles = files.filter(file =>
  fs.statSync(path.join(imagesPath, file)).isFile()
);
console.log('done');

const send500 = (res, err) => {
  if (!res.headersSent) {
    res.status(500).send({ err }).end();
  }
};

// read courses at server
router.get('/', (req, res) => {
  res.status(200).json({ imagesFiles }).end();
});


router.post('/upload', ensureAuthenticated, (req, res) => {
  console.log('image-upload');

  const form = new formidable.IncomingForm();
  form.multiples = false;
  form.uploadDir = imagesPath;

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

  form.on('error', (err) => {
    console.log(' An error has occurred: \n ${err}');
    send500(res, err);
  });

  // parse the incoming request containing the form data
  form.parse(req);
});

module.exports = router;
