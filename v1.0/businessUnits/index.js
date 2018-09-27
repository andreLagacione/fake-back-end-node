const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util');

const newBlah = () => ({ cif: chance.bool(), cifRetira: chance.bool(), fob: chance.bool(), transferencia: chance.bool() })

const getRandomBusinessUnitList = () => {
	const list = [];
	//list.push({ id: 1, name: 'Common business unit' })
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			codigo: chance.integer({ min: 1, max: 999999 }),
			descricao: chance.word({ length: 6, alpha: true }),
			email: chance.email(),
			ativo: chance.bool(),
			toleranciaChamado: chance.integer({ min: 1, max: 999999 }),
			quantidadeNumerosLacre: chance.integer({ min: 1, max: 999999 }),
			horariosAtendimento: [{ inicial: '08:00', final: '12:00' }, { inicial: '13:00', final: '18:00' }],
			cadastroAutomatico: newBlah(),
			cancelamentoAutomatico: newBlah(),
			bloqueioPreMarcacao: newBlah(),
			TRSNETAtivo: chance.bool(),
			centralPaletesOnline: chance.bool(),
			urlTRSNET: chance.url(),
			exigeCTE: chance.bool(),
			totem: {
				solicitarPossuiChapa: chance.bool(),
				solicitarPossuiCompressor: chance.bool(),
				solicitarPossuiDescargaFumaca: chance.bool(),
				solicitarPossuiMunck: chance.bool(),
			}

		});
	}

	list[0].id = 1;
	list[0].descricao = 'Default business unit';

	return list;
};

router.get('/', (_, response) => {
	const itemList = getRandomBusinessUnitList();
	const responseContent = defaultListResponse(itemList);
	response.json(responseContent);
});

router.get('/count', (request, response) => {
	const count = chance.integer({ min: 15, max: 150 });
	response.json({ count });
});

module.exports = router;
