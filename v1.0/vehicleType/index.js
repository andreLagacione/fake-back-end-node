const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util');

const getRandomList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			descricao: chance.sentence({ words: 2 })
		});
	}

	list[0].id = 1;
	list[0].descricao = 'Default vehicle type';

	return list;
};

router.get('/', (_, response) => {
	const itemList = getRandomList();
	const responseContent = defaultListResponse(itemList);
	response.json(responseContent);
});

router.get('/count', (_, response) => {
	const count = chance.integer({ min: 15, max: 150 });
	response.json({count});
});

module.exports = router;
