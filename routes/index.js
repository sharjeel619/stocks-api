var express = require('express');
var router = express.Router();
var { getStockByName, getAllStockNames } = require('../database/db');

router.get('/stock', async function (req, res, next) {
  try {
    const { query } = req;
    const result = await getStockByName(query.stock_name);
    res.send(result);
  }
  catch (e) {
    console.log(e);
    res.send({ "error": e });
  }
});
router.get('/stocks', async function (req, res, next) {
  try {
    const result = await getAllStockNames();
    res.send(result);
  }
  catch (e) {
    console.log(e);
    res.send({ "error": e });
  }
});
module.exports = router;
