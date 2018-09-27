const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util');

const getRandomProfileList = () => {
	const list = [];
	list.push({ id: 1, nome: 'Common profile', descricao: 'Common profile' })
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			nome: chance.word({ length: 6, alpha: true }),
			descricao: chance.word({ length: 12, alpha: true }),
			ativo: chance.bool()
		});
	}

	return list;
};

router.get('/', (_, response) => {
	const itemList = getRandomProfileList();
	const responseContent = defaultListResponse(itemList);
	response.json(responseContent);
});

router.get('/count', (_, response) => {
	const count = chance.integer({ min: 15, max: 150 });
	response.json({count});
});

module.exports = router;
