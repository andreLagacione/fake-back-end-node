const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse, horariosGenerator, tipoCarregamentoListGenerator } = require('../../util')
	, listaVeiculos = require('../vehicles')
	, listaProdutos = require('../product')
	, listaUnidadesNegocio = require('../unidadeNegocio');

const getPontosCarregamentoList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			descricao: chance.sentence({ words: 2 }),
			codigo: chance.ssn({ dashes: false }),
			horarios: horariosGenerator(),
			veiculos: listaVeiculos.getRandomVehicleList(),
			produtos: listaProdutos.getRandomList(),
			unidades: listaUnidadesNegocio.getRandomUnidadeNegocioList(),
			tipoCarregamento: tipoCarregamentoListGenerator()
		});
	}

	return list;
};

router.get('/', (_, response) => {
	const itemList = getPontosCarregamentoList();
	const responseContent = defaultListResponse(itemList);
	response.json(responseContent);
});

router.get('/count', (request, response) => {
	const count = chance.integer({ min: 15, max: 150 });
	response.json({ count });
});

module.exports = router;
