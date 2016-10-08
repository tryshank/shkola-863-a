const Router = require('express');
const { ensureAuthenticated } = require('../middleware/AuthMiddleware');
const CoursesModel = require('../model/CoursesModel');
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
  let ordering = 0;
  delete doc._id;
  // determine maximum ordering
  CoursesModel.find().limit(1).sort('-ordering').
  exec((err, docs) => {
    if (err) {
      send500(res, err);
    } else {
      ordering = docs[0].ordering + 1;
      doc = new CoursesModel(doc);
      doc.ordering = ordering;
      doc.save((errSave, data) => {
        if (err) {
          send500(res, errSave);
        } else {
          if (data) {
            res.status(200).send({ data }).end();
          } else {
            send500(res, 'item didn\'t saved');
          }
        }
      });
    }
  });
});

// put-edit/update
router.put('/:id', ensureAuthenticated, (req, res) => {
  if (req.params.id) {
    const courseItem = req.body.courseItem;
    if (courseItem) {
      console.log('update item: ', courseItem);
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
  } else {
    send404(res);
  }
});


// put-sort
router.put('/:courseItemId/:courseItemSwapId/', ensureAuthenticated, (req, res) => {
  const { courseItemId, courseItemSwapId } = req.params;
  if (courseItemId && courseItemSwapId) {
    // direction: true - up (to left), false - down (to right)
    const { direction, position, positionSwap } = req.body;
    console.log('swap positions / ordering of items');
    console.log('id: ', courseItemId, ', ordering: ', position);
    console.log('id: ', courseItemSwapId, ', ordering: ', positionSwap);
   // find current course and determine next/previous course to swap ordering numbers
    CoursesModel.find({ ordering: direction ? { $lte: position } : { $gte: position } })
      .limit(2).sort(`${direction ? '-' : ''}ordering`).
    exec((err, docs) => {
      if (err) {
        send500(res, err);
      } else {
        // check db returned 2 docs
        if (docs.length === 2) {
          // check id and position of first doc equal id and position from request
          if (docs[0]._id.toString() === courseItemId && docs[1]._id.toString() === courseItemSwapId
            && docs[0].ordering === position && docs[1].ordering === positionSwap) {
            // set new position for course user moving
            CoursesModel.findOneAndUpdate({ _id: courseItemId },
              { $set: { ordering: positionSwap } }, { new: true }, (errU, updatedDoc) => {
                if (errU) {
                  send500(res, errU);
                } else {
                  // check update successfully
                  if (updatedDoc.ordering === positionSwap) {
                    // set new position for swapped course
                    CoursesModel.findOneAndUpdate({ _id: courseItemSwapId },
                      { $set: { ordering: position } }, { new: true }, (errUS, updatedDocS) => {
                        if (errUS) {
                          send500(res, errUS);
                        } else {
                          // check update successfully
                          if (updatedDocS.ordering === position) {
                            res.status(200).json({ result: true,
                              original: { id: courseItemId, newPosition: positionSwap },
                              swap: { id: courseItemSwapId, newPosition: position },
                            }).end();
                          } else {
                            send500(res, 'ordering failed');
                          }
                        }
                      });
                  } else {
                    send500(res, 'ordering failed');
                  }
                }
              });
          } else {
            const errSend = 'course(s) id or position(s) mismatch';
            send500(res, errSend);
          }
        }
      }
    });
  } else {
    send404(res);
  }
});


// delete
router.delete('/:id', ensureAuthenticated, (req, res) => {
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

router.get('/isLoggedIn', ensureAuthenticated);

module.exports = router;
