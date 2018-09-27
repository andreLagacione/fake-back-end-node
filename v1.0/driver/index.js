const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse, bloqueiosListGenerator, biometriasListGenerator, treinamentosListGenerator } = require('../../util')
	, unidadesNegocio = require('../unidadeNegocio');

const getRandomLoadTypeList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			codigo: chance.sentence({ words: 2 }),
			cpf: chance.cpf(),
			nome: chance.name(),
			dataValidadeCNH: chance.date({ year: 2018 }),
			numeroTelefoneCelular: chance.phone({ country: 'uk', mobile: true }).replace(' ', ''),
			numeroTelefoneFixo: chance.phone({ country: 'uk', mobile: false }).replace(' ', ''),
			codEmpresa: chance.integer({ min: 1, max: 2000 }),
			flgEstrangeiro: chance.integer({ min: 1, max: 2 }),
			cnh: chance.integer({ min: 10000000000, max: 99999999999 }),
			categoriaCNH: chance.word({ length: 1 }).toUpperCase(),
			dataValidadeCadastro: chance.date({ year: 2018 }),
			flgPossuiProblema: chance.integer({ min: 1, max: 2 }),
			flgBloqueio: chance.integer({ min: 1, max: 2 }),
			rua: chance.sentence({ words: 3 }),
			numero: chance.integer({ min: 1, max: 100000 }),
			bairro: chance.sentence({ words: 3 }),
			cep: chance.zip({plusfour: true}),
			cidade: chance.city(),
			uf: chance.word({ length: 2 }).toUpperCase(),
			numeroCelularTransportadora: chance.phone({ country: 'uk', mobile: false }).replace(' ', ''),
			bloqueios: bloqueiosListGenerator(),
			biometrias: biometriasListGenerator(),
			treinamentos: treinamentosListGenerator(),
			unidadesNegocio: unidadesNegocio.getRandomUnidadeNegocioList()
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
