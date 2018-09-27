const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util');

let totalItens = 0;

const getItinerariosList = () => {
	const list = [];
	for (let index = 0; index < totalItens; index++) {
		list.push({
			id: chance.hash(),
			nomeProduto: chance.word({ length: 7 }),
			pedidos: detalhesPedido()
		});
	}

	return list;
};

const obrigatoriosViagem = () => {
	return {
		compressor: chance.bool(),
		descargaFumaca: chance.bool(),
		chapa: chance.bool(),
		munck: chance.bool()
	}
}

const detalhesPedido = () => {
	let list = [];
	for (let i = 0; i < 2; i++) {
		list.push({
			id: chance.hash(),
			ordem: chance.integer({ min: 1, max: 20 }),
			placa: chance.word({ length: 3 }).toUpperCase() + ' - ' + chance.integer({ min: 1000, max: 9999 }),
			regiaoRegistro: chance.city(),
			obrigatorioViagem: obrigatoriosViagem(),
			horaPrevista: chance.timestamp()
		})
	}

	return list;
}

router.get('/', (_, response) => {
	totalItens = Math.floor(_.query.take / 2);
	const itemList = getItinerariosList();
	const responseContent = defaultListResponse(itemList);
	response.json(responseContent);
});

router.get('/count', (request, response) => {
	const count = chance.integer({ min: 15, max: 150 });
	response.json({ count });
});

module.exports = router;
