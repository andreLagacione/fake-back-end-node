const router = require('express').Router();

router.use('/api-gateway/enderecos', require('./addresses'));

module.exports = router;
