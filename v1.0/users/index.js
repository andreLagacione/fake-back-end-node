const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util');

const getRandomUserList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		let fullName = chance.name({ middle: true }).split(' '); 
		list.push({
			id: chance.hash(),
			nome: fullName[0],
			sobrenome: fullName[1] + ' ' + fullName[2],
			credencial: chance.word({ length: 6, alpha: true, casing: 'lower' }) + '.' + chance.word({ length: 6, alpha: true, casing: 'lower' }),
			email: chance.email(),
			ativo: chance.bool(),
			provedorIdentidadeId: chance.integer({min: 1, max: 2}).toString(),
			perfis: [{ id: 1, nome: 'Common profile' }],
			unidadesNegocio: [{ id: 1, nome: 'Common business unit' }]
		});
	}

	return list;
};

router.get('/', (_, response) => {
	const itemList = getRandomUserList();
	const responseContent = defaultListResponse(itemList);
	response.json(responseContent);
});

router.get('/count', (request, response) => {
	const count = chance.integer({ min: 15, max: 150 });
	response.json({count});
});

module.exports = router;
