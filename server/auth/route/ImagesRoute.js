const Router = require('express');
const { ensureAuthenticated } = require('../middleware/AuthMiddleware');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const imageSharp = require('sharp');
const ImagesModel = require('../model/ImagesModel');
const errorStatusSender = require('./../ErrorStatusSender');
const router = new Router();

const mkdirp = require('mkdirp');
const imagesPath = path.join(__dirname, '/../../img');
console.log('images path: ', imagesPath);

mkdirp(imagesPath, (err) => {
  if (err) {
    throw new Error(`Unable read/create path ${imagesPath}`);
  }
  try {
    fs.accessSync(imagesPath, fs.W_OK);
  } catch (e) {
    throw new Error(`No write access to ${imagesPath} `, e);
  }
});


// read courses at server
router.get('/', (req, res) => {
  ImagesModel.find({}, '-_id -__v').exec()
    .then(imagesFiles => {
      res.status(200).json({ imagesFiles }).end();
    })
    .catch(err =>
      console.log('images db reading error\n\r', err)
    );
});


// upload image
router.post('/upload', ensureAuthenticated, (req, res) => {
  console.log('image-upload');

  const imageBigPostfix = '_big.jpg';
  const imageSmallPostfix = '_small.jpg';
  const imageWidthBig = 960;
  const imageWidthSmall = 400;

  const imageResize = (width, inFileName, outFileName) => {
    console.log(`resize image to ${width}px\n\r
    input:\n\r${inFileName}\n\routput:\n\r${outFileName}`);
    return imageSharp(inFileName).withoutEnlargement().resize(width)
      .toFile(outFileName);
  };

  const cleanUp = (filesToRemove) => {
    filesToRemove.forEach(file => {
      try {
        console.log(`Cleanup file ${file}`);
        fs.unlinkSync(file, errUnlink =>
          console.log(`Error cleanup file ${file}\n\r${errUnlink}`)
        );
      } catch (err) {
        console.log();
      }
    });
  };

  const form = new formidable.IncomingForm();
  form.multiples = false;
  form.uploadDir = imagesPath;

  // parse the incoming request containing the form data
  form.parse(req);

  form.on('error', (err) => {
    console.log(`An error has occurred: \n ${err}`);
    errorStatusSender.sendErrorStatus(errorStatusSender.ERROR_STATUS_BAD_REQUEST, res);
  });

  form.on('file', (field, file) => {
    const imageBigName = file.path + imageBigPostfix;
    const imageSmallName = file.path + imageSmallPostfix;
    const imageOriginal = file.path;
    const imagesToClean = [imageOriginal, imageSmallName];
    imageResize(imageWidthSmall, imageOriginal, imageSmallName)
      .then(() => {
        imagesToClean.push(imageSmallName);
        return imageResize(imageWidthBig, imageOriginal, imageBigName);
      })
      .then(() => {
        const filename = path.basename(file.path);
        const imageObject = {
          big: filename.concat(imageBigPostfix),
          small: filename.concat(imageSmallPostfix),
        };
        return new ImagesModel(imageObject).save();
      })
      .then(data => {
        console.log('adding to DB ok, data:\n\r', data);
        res.status(200).send({ data }).end();
        cleanUp([imageOriginal]);
      })
      .catch(err => {
        console.log('Error\n\r', err);
        errorStatusSender.sendErrorStatus(errorStatusSender.ERROR_STATUS_SERVER_ERROR, res);
        cleanUp(imagesToClean);
      });
  });
});

module.exports = router;
