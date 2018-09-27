const Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util');

module.exports.router = require('express').Router()

module.exports.getRandomList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			codigo: chance.integer({ min: 1, max: 9999999 }),
			descricao: chance.sentence({ words: 4 })
		});
	}

	return list;
};

module.exports.router.get('/', (_, response) => {
	const itemList = module.exports.getRandomList();
	const responseContent = defaultListResponse(itemList);
	response.json(responseContent);
});

module.exports.router.get('/count', (_, response) => {
	const count = chance.integer({ min: 15, max: 150 });
	response.json({count});
});
