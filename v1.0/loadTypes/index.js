const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util')
	, unidadeNegocio = require('../unidadeNegocio');

const loadCategory = [
	{ id: 0, descricao: 'Granel' },
	{ id: 1, descricao: 'Ensacado' }
];

const loadType = [
	{ id: 0, descricao: 'Carga' },
	{ id: 1, descricao: 'Descarga' }
];

const getRandomLoadTypeList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			descricao: chance.sentence({ words: 2 }),
			categoria: loadCategory[chance.bool() ? 0 : 1].id,
			tipo: loadType[chance.bool() ? 0 : 1].id,
			possuiLacre: chance.bool(),
			solicitarNumeroPedido: chance.bool(),
			unidadesNegocio: [{ id: 0, nome: 'Common business unit' }]
		});
	}

	return list;
};

router.get('/', (_, response) => {
	const itemList = getRandomLoadTypeList();
	const responseContent = defaultListResponse(itemList);
	response.json(responseContent);
});

router.get('/count', (request, response) => {
	const count = chance.integer({ min: 15, max: 150 });
	response.json({ count });
});

module.exports = router;
