const Router = require('express');
const { ensureAuthenticated } = require('../middleware/AuthMiddleware');
const CoursesModel = require('../model/CoursesModel');
const mongoose = require('mongoose');
const router = new Router();

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
router.get('/', (req, res) => {
  CoursesModel.find().sort('ordering').exec((err, docs) => {
    if (err) {
      send500(res, err);
    } else {
      res.status(200).json({ docs }).end();
    }
    return null;
  });
});


// post/add-create
router.post('/', ensureAuthenticated, (req, res) => {
  console.log('add new item');
  let doc = req.body.data;
  if (doc) {
    let ordering = 0;
    delete doc._id;
    // determine maximum ordering
    CoursesModel.find().limit(1).sort('-ordering').
    then(
      docs => {
        if (docs) {
          ordering = docs[0].ordering + 1;
        } else {
          // if this is first document to be added
          ordering = 0;
        }
        doc = new CoursesModel(doc);
        doc.ordering = ordering;
        doc.save((errSave, data) => {
          if (errSave) {
            send500(res, errSave);
          } else {
            if (data) {
              res.status(200).send({ data }).end();
            } else {
              send500(res, 'item didn\'t saved');
            }
          }
        });
      },
      err => {
        send500(res, err);
      });
  } else {
    const err = 'no item id specified';
    console.log(err);
    send500(res, err);
  }
});

// put-edit/update
router.put('/:id', ensureAuthenticated, (req, res) => {
  if (req.params.id) {
    const courseItem = req.body.courseItem;
    if (courseItem) {
      console.log(`update item with id ${req.params.id}`);
      delete courseItem._id;
      CoursesModel.update({ _id: req.params.id }, req.body.courseItem)
      .then(
        doc =>
          res.status(200).json({ id: req.params.id, item: req.body.courseItem }).end(),
        err => {
          console.log(err);
          send500(res, err);
        });
    } else {
      const err = 'no item data specified';
      console.log(err);
      send500(res, err);
    }
  } else {
    const err = 'no item id specified';
    console.log(err);
    send500(res, err);
  }
});


const updateCoursePosition = (_id, ordering) =>
  CoursesModel.findOneAndUpdate({ _id }, { $set: { ordering } }, { new: true });


// put-sort
router.put('/:courseItemId/:courseItemSwapId/', ensureAuthenticated, (req, res) => {
  const { courseItemId, courseItemSwapId } = req.params;
  if (courseItemId && courseItemSwapId) {
    // direction: true - up (to left), false - down (to right)
    const { direction, position, positionSwap } = req.body;
    console.log('swap positions / ordering of items');
    console.log('id: ', courseItemId, ', position: ', position);
    console.log('id: ', courseItemSwapId, ', position: ', positionSwap);
    // find current course and determine next/previous course to swap ordering numbers
    CoursesModel.find({
      _id: { $in: [courseItemId, courseItemSwapId].map(id => mongoose.Types.ObjectId(id)) } })
      .limit(2).sort(`${direction ? '-' : ''}ordering`)
      .then(
        docs => {
          let err = 'can\'t find items with specified ID\'s';
          if (docs.length === 2) {
            // check id and position of first doc equal id and position from request
            if (docs[0]._id.toString() === courseItemId && docs[0].ordering === position &&
              docs[1]._id.toString() === courseItemSwapId && docs[1].ordering === positionSwap) {
              // set new position for course user moving
              return updateCoursePosition(courseItemId, positionSwap);
            }
            err = 'can\'t find items with specified ID\'s and positions';
          }
          console.log(err);
          send500(res, err);
          return null;
        },
        err => {
          console.log('error occurred while finding items with specified ID\'s:\n', err);
          send500(res, err);
        })
      .then(
        updatedDoc => {
          if (updatedDoc.ordering === positionSwap) {
            // set new position for swapped course
            return updateCoursePosition(courseItemSwapId, position);
          }
          const err = ('ordering failed on updating 1st item position');
          console.log(err);
          send500(res, err);
          return null;
        },
        err => {
          console.log('failed update 1st item:\n', err);
          send500(res, err);
        })
      .then(
        updatedDoc => {
          // check update successfully
          if (updatedDoc.ordering === position) {
            res.status(200).json({ result: true,
              original: { id: courseItemId, newPosition: positionSwap },
              swap: { id: courseItemSwapId, newPosition: position },
            }).end();
          } else {
            const err = ('ordering failed on updating 2nd item position');
            console.log(err);
            send500(res, err);
          }
        },
        err => {
          console.log(err);
          send500(res, err);
        });
  } else {
    const err = 'no items id\'s specified';
    console.log(err);
    send500(res, err);
  }
});


// delete
router.delete('/:id', ensureAuthenticated, (req, res) => {
  if (req.params.id) {
    console.log(`delete item with id ${req.params.id}`);
    CoursesModel.findById(req.params.id)
    .then(
      docs => {
        if (docs) {
          return CoursesModel.remove({ _id: req.params.id });
        }
        send404(res);
        return null;
      },
      err => {
        console.log(err);
        send500(res, err);
      })
    .then(
      result =>
        res.status(200).end()
      ,
      err => {
        console.log(err);
        send500(res, err);
      }
    );
  } else {
    const err = 'no item id specified';
    console.log(err);
    send500(res, err);
  }
});

router.get('/isLoggedIn', ensureAuthenticated);

module.exports = router;
