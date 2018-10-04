const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util')
	, vehicle = require('../vehicles')
	, unidadeNegocio = require('../unidadeNegocio');

const getItinerariosList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			unidadeNegocioId: unidadeNegocio.getUnidadeNegocio().id,
			unidadeNegocio: unidadeNegocio.getUnidadeNegocio(),
			transportadora: transportadora,
			rota: chance.sentence({ words: 3 }),
			ativo: chance.bool()
		});
	}

	return list;
};

const transportadora = {
	id: chance.hash(),
	codigo: chance.integer({ min: 1, max: 999999 }),
	cnpj: chance.integer({ min: 10000000000000, max: 99999999999999 }).toString(),
	cpf: chance.cpf().match(/\d+/g).join(''),
	nome: chance.name(),
	dataValidadeCNH: new Date(),
	numCel: chance.phone({ country: 'uk', mobile: true }).replace(' ', ''),
	motoristas: [
		{
			cpf: chance.cpf().match(/\d+/g).join(''),
			nome: chance.name(),
			numCel: chance.phone({ country: 'uk', mobile: true }).replace(' ', ''),
		},
		{
			cpf: chance.cpf().match(/\d+/g).join(''),
			nome: chance.name(),
			numCel: chance.phone({ country: 'uk', mobile: true }).replace(' ', ''),
		},
		{
			cpf: chance.cpf().match(/\d+/g).join (''),
			nome: chance.name(),
			numCel: chance.phone({ country: 'uk', mobile: true }).replace(' ', ''),
		}
	],
	veiculos: vehicle.getRandomVehicleList(6)
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
