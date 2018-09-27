const Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse, horariosGenerator, cadastroAutomaticoGenerator } = require('../../util');

module.exports.router = require('express').Router()

module.exports.getRandomUnidadeNegocioList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			codigo: chance.sentence({ words: 2 }),
			descricao: chance.word(),
			ativo: chance.bool(),
			toleranciaChamado: chance.integer({ min: 1, max: 100}),
			quantidadeNumerosLacre: chance.integer({ min: 0, max: 100000}),
			horariosAtendimento: horariosGenerator(),
			cadastroAutomatico: cadastroAutomaticoGenerator(),
			cancelamentoAutomatico: cadastroAutomaticoGenerator(),
			bloqueioPreMarcacao: cadastroAutomaticoGenerator(),
			trsnetAtivo: chance.bool(),
			centralPaletesOnline: chance.bool(),
			urlTRSNET: chance.url()
		});
	}

	return list;
};

module.exports.getUnidadeNegocio = () => {
	return {
		id: chance.hash(),
		codigo: chance.sentence({ words: 2 }),
		descricao: chance.word(),
		ativo: chance.bool(),
		toleranciaChamado: chance.integer({ min: 1, max: 100}),
		quantidadeNumerosLacre: chance.integer({ min: 0, max: 100000}),
		horariosAtendimento: horariosGenerator(),
		cadastroAutomatico: cadastroAutomaticoGenerator(),
		cancelamentoAutomatico: cadastroAutomaticoGenerator(),
		bloqueioPreMarcacao: cadastroAutomaticoGenerator(),
		trsnetAtivo: chance.bool(),
		centralPaletesOnline: chance.bool(),
		urlTRSNET: chance.url()
	}
};

module.exports.router.get('/', (_, response) => {
	const itemList = module.exports.getRandomUnidadeNegocioList();
	const responseContent = defaultListResponse(itemList);
	response.json(responseContent);
});

module.exports.router.get('/count', (request, response) => {
	const count = chance.integer({ min: 15, max: 150 });
	response.json({ count });
});
