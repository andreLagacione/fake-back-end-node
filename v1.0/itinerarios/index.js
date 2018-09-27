const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse, regiaoListGenerator } = require('../../util')
	, listaUnidadesNegocio = require('../unidadeNegocio');

const getItinerariosList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			descricao: chance.sentence({ words: 2 }),
			codigo: chance.ssn({ dashes: false }),
			unidadeNegocio: listaUnidadesNegocio.getRandomUnidadeNegocioList(),
			regiao: regiaoListGenerator(),
			distancia: chance.integer({ min: 0, max: 2000 }) + 'km',
			zona: regiaoListGenerator(),
			pais: chance.country({ full: true })
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
