const router = require('express').Router();

router.use('/measurement-unit', require('./measurement-unit'));
router.use('/items-manager/items', require('./item'));
router.use('/items-manager/product-classes', require('./product-classes'));
router.use('/rule-profile', require('./rule-profile'));
router.use('/load', require('./load'));
router.use('/warehouse', require('./warehouse'));

module.exports = router;
