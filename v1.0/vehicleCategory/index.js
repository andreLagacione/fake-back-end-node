const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util');

const getRandomList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			descricao: chance.sentence({ words: 2 }),
			capacidadeMinima: chance.integer({ min: 1, max: 999 }),
			capacidadeMaxima: chance.integer({ min: 1, max: 999 }),
			quantidadePlaca: chance.integer({ min: 1, max: 5 }),
			imagem: chance.integer({ min: 1, max: 12 }).toString(),
			tiposVeiculo: [{
				id: 1,
				descricao: 'Default vehicle type'
			}]
		});
	}

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
