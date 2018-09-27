const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util');

const getRandomItemClassList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			name: chance.sentence({ words: 4, alpha: true, casing: 'upper' })
		});
	}

	return list;
};

router.get('/', (request, response) => {
	const itemList = getRandomItemClassList();
	const responseContent = defaultListResponse(itemList, chance.integer({ min: 15, max: 150 }));
	response.json(responseContent);
});

module.exports = router;
