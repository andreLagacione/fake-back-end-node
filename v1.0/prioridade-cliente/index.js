const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util')
	, unidadeNegocio = require('../unidadeNegocio');

const getItinerariosList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			unidadeNegocioId: unidadeNegocio.getUnidadeNegocio().id,
			unidadeNegocio: unidadeNegocio.getUnidadeNegocio(),
			cliente: chance.sentence({ words: 3 }),
			cpfCnpj: chance.cpf(),
			codigoSap: chance.integer({ min: 1000, max: 9999 }),
			dataInicio: chance.date(),
			dataFim: chance.date(),
			ativo: chance.bool()
		});
	}

	return list;
};

router.get('/', (_, response) => {
	const itemList = getItinerariosList();
	const responseContent = defaultListResponse(itemList);
	response.json(responseContent);
});

router.get('/count', (request, response) => {
	const count = chance.integer({ min: 15, max: 150 });
	response.json({ count });
});

module.exports = router;
