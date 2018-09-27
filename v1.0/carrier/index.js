const router = require('express').Router()
	, vehicle = require('../vehicles')
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util');

const getRandomList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		const cnpj = chance.bool()
		list.push({
			id: chance.hash(),
			codigo: chance.integer({ min: 1, max: 999999 }),
			[cnpj ? 'cnpj' : 'cpf']: cnpj ? chance.integer({ min: 10000000000000, max: 99999999999999 }).toString() : chance.cpf().match(/\d+/g).join(''),
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
	response.json({ count });
});

module.exports = router;
