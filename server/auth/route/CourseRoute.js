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
  CoursesModel.find((err, docs) => {
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
router.put('/:id', ensureAuthenticated, (req, res) => {
  if (req.params.id) {
    console.log('req ', req);
    console.log('_id: ', req.params.id);
    const courseItem = req.body.courseItem;
    if (courseItem) {
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
