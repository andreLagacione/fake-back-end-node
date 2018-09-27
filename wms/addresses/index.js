const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util');

const getRandomWarehouseList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			description: chance.sentence({ words: 2, alpha: true, casing: 'upper' })
		});
	}

	return list;
};

router.get('/', (_, response) => {
	const itemList = getRandomWarehouseList();
	const responseContent = defaultListResponse(itemList, chance.integer({ min: 15, max: 150 }));
	response.json(responseContent);
});

module.exports = router;
