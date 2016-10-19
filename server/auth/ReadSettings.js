const AdminModel = require('./model/AdminModel');

exports.readSettings = () =>
  AdminModel.findOne({}, { _id: 0 })
    .then(
      mail =>
        ({ result: true, mail, err: null })
      ,
      err => {
        console.log(err);
        return ({ result: false, mail: null, err });
      }
    );
