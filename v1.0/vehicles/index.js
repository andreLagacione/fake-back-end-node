const Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util');

module.exports.router = require('express').Router()

module.exports.getRandomVehicleList = (size = 10) => {
	const list = [];
	for (let index = 0; index < size; index++) {
		list.push({
			id: chance.hash(),
			placa: chance.word({ length: 3}).toUpperCase() + '-' + chance.integer({min: 1000, max: 9999}),
			tipo: {
				id: 1,
				descricao: 'Default vehicle type',
				valCapacidadeCarga: 1000
			},
			descricao: chance.sentence({ words: 2 }),
			flgDescargaMecanizada: chance.bool(),
			dataValidadeLicenciamento: chance.date({ year: 2018 }),
			renavam: chance.integer({min: 10000000000, max: 99999999999}),
			placaUf: chance.word({ length: 2}).toUpperCase(),
			qtdEixos: chance.integer({min: 2, max:100}),
			qtdEixoRetorno: chance.integer({min: 2, max:100}),
			anoModelo: chance.year({min: 1950, max:2019}),
			flgRastreamento: chance.integer({min: 1, max:2}),
			tipoRastreabilidade: chance.word({ length: 5}),
			pesoTara: chance.integer({min: 1000, max:5000}) + '/' + chance.integer({min: 5000, max:25000}),
			flgCompressor: chance.integer({min: 1, max:2}),
			flgDescargaMecanizada: chance.integer({min: 1, max:2}),
			flgLicenciado: chance.integer({min: 1, max:2}),
			dataLicenciamento: chance.date({ year: 2018 }),
			dataValidadeLicenciamento: chance.date({ year: 2018 }),
			descMotivo: chance.sentence({ length: 5}).toUpperCase()
		});
	}

	return list;
};

module.exports.router.get('/', (_, response) => {
	const itemList = module.exports.getRandomVehicleList();
	const responseContent = defaultListResponse(itemList);
	response.json(responseContent);
});

module.exports.router.get('/count', (_, response) => {
	const count = chance.integer({ min: 15, max: 150 });
	response.json({count});
});
