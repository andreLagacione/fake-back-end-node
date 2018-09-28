const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse, obrigatoriosViagem } = require('../../util');

let totalItens = 0;

const getItinerariosList = () => {
	const list = [];
	for (let index = 0; index < totalItens; index++) {
		list.push({
			id: chance.hash(),
			placa: chance.word({ length: 3 }).toUpperCase() + ' - ' + chance.integer({ min: 1000, max: 9999 }),
			nomeMotorista: chance.sentence({ words: 3 }),
			regiaoRegistro: chance.city(),
			obrigatorioViagem: obrigatoriosViagem(),
			chamado: '00:' + chance.minute(),
			tempoTrocarTela: 30000
		});
	}

	return list;
};

router.get('/', (_, response) => {
	totalItens =_.query.take;
	const itemList = getItinerariosList();
	const responseContent = defaultListResponse(itemList);
	response.json(responseContent);
});

router.get('/count', (request, response) => {
	const count = chance.integer({ min: 15, max: 150 });
	response.json({ count });
});

module.exports = router;
