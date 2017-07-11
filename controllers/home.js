const List = require('../models/List');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  List.find({}).sort('-createdAt').exec(function(err, lists) {
    if (err) {
      return next(err);
    }
    res.render('pages/home', {
      lists
    });
  });

};
