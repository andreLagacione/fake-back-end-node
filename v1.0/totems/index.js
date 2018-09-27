const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util');

const getRandomTotemList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			descricao: chance.sentence({ words: 2 }),
			ativo: chance.bool(),
			unidadeNegocio: {
				id: 1,
				descricao: 'Default business unit'
			},
			tiposCarregamento: [{
				id: 1,
				descricao: 'Default load type'
			}],
			quantidadeDigitosLacre: chance.integer({ min: 1, max: 5 })
		});
	}

	return list;
};

router.get('/', (_, response) => {
	const itemList = getRandomTotemList();
	const responseContent = defaultListResponse(itemList);
	response.json(responseContent);
});

router.get('/count', (request, response) => {
	const count = chance.integer({ min: 15, max: 150 });
	response.json({count});
});

module.exports = router;
