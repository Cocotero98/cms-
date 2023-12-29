var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('aaaaaaaaaaaaaaaaaaaa'+__dirname)
  res.sendFile(path.join(__dirname, '../../dist/cms/index.html'));
});

module.exports = router;
