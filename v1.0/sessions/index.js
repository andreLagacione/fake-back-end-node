const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util');

router.post('/create', (_, response) => {
	response.json({ token: chance.apple_token() });
});

router.post('/check', (_, response) => {
	response.json({ token: chance.apple_token() });
});

module.exports = router;
