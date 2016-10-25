const AdminModel = require('./model/AdminModel');

exports.readSettings = () =>
  AdminModel.findOne({}, { _id: 0 })
    .then(
      email =>
        ({ email }),
      err => {
        console.log(err);
        return ({ err });
      }
    );
