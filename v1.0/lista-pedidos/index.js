const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse, obrigatoriosViagem } = require('../../util')
	, statusPedido = ['Sem carga', 'Calculando', 'Cancelado', 'Vinculado no SAP'];

let totalItens = 0;

const getItinerariosList = () => {
	const list = [];
	for (let index = 0; index < totalItens; index++) {
		list.push({
			id: chance.hash(),
			nomeProduto: chance.word({ length: 7 }),
			pedidos: detalhesPedido(),
			tempoTrocarTela: 30000
		});
	}

	return list;
};

const detalhesPedido = () => {
	let list = [];
	for (let i = 0; i < 2; i++) {
		list.push({
			id: chance.hash(),
			ordem: i + 1,
			preMarcadoCelular: chance.bool(),
			placa: chance.word({ length: 3 }).toUpperCase() + ' - ' + chance.integer({ min: 1000, max: 9999 }),
			prioridade: chance.bool(),
			nomeMotorista: chance.sentence({ words: 3 }),
			regiaoRegistro: chance.city(),
			obrigatorioViagem: obrigatoriosViagem(),
			horaPrevista: '2018-09-' + chance.integer({ min: 28, max: 30 }) + 'T' + chance.hour({twentyfour: true}) + ':' + chance.minute() + ':' + chance.second(),
			statusPedido: statusPedido[chance.integer({ min: 0, max: 3 })]
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
