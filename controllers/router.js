var router = require('express').Router();


router.use('/common', require('./common.js'));
router.use('/master', require('./master.js'));
router.use('/slave', require('./slave.js'));

module.exports = router;


