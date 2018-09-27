const router = require('express').Router()
    , measurementUnitList = require('./list');


router.get('/', (request, response) => {
    response.json(measurementUnitList);
});

module.exports = router;