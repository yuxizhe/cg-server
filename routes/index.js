var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list', (req, res, next) => {
  if(global.ADList){
    res.json(global.ADList)
  }
})

router.get('/cg/buy-list', (req, res, next) => {
  if(global.buyList){
    res.json(global.buyList)
  }
})
router.get('/cg/sell-list', (req, res, next) => {
  if(global.sellList){
    res.json(global.sellList)
  }
})
router.get('/cg/burn-list', (req, res, next) => {
  if(global.burnList){
    res.json(global.burnList)
  }
})
module.exports = router;
