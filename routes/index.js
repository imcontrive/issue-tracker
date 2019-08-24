var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('*', function(req, res, next) {

  const cssPath = process.env.NODE_ENV == 'production' ? `/dist/bundle/bundle.css` : '/static/bundle.css';
 const jsPath = process.env.NODE_ENV == 'production' ? `/dist/bundle/bundle.js` : '/static/bundle.js';
  res.render('index', { title: 'issue trackr', cssPath, jsPath });
});

module.exports = router;
