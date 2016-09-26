exports.ensureAuthenticated = (req, res, next) => {
  console.log(`is autheticated ${req.isAuthenticated()}`);
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('not authenticated');
};
