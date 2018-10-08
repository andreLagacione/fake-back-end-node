const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse, transportadora, produto } = require('../../util');

const getItinerariosList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			horaLimite: chance.hour(),
			diaReferencia: chance.date(),
			origem: chance.city(),
			destino: chance.city(),
			transferencia: transferenciasList()
		});
	}

	return list;
};

const transferenciasList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			codigoSap: '' + chance.integer({ min: 10000, max: 99999 }),
			produto: produto(),
			quantidade: '' + chance.integer({ min: 100, max: 999 }),
			transportadora: transportadora(),
			prioridade: chance.integer({ min: 0, max: 10 })
		});
	}

	return list;
}

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
