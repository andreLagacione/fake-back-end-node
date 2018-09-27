const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util');

const getRandomItemList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			code: chance.integer({ min: 0, max: 99999 }),
			description: chance.sentence({ words: 4, alpha: true, casing: 'upper' }),
			shortDescription: chance.sentence({ words: 2, alpha: true, casing: 'upper' }),
			class: {
				id: chance.hash(),
				name: chance.sentence({ words: 2, alpha: true, casing: 'upper' })
			}
		});
	}

	return list;
};

router.get('/', (request, response) => {
	const returnEmptyList = (request.query.query || request.query.code) && chance.bool();
	const itemList = returnEmptyList ? [] : getRandomItemList();
	const responseContent = defaultListResponse(itemList, chance.integer({ min: 15, max: 150 }));
	response.json(responseContent);
});

router.get('/:id', (_, response) => {
	const detail = {
		id: 'a3c701042b5f-a3c701042b5f-a3c701042b5f-a3c701042b5f',
		disposable: true,
		type: 'FinishedGood',
		code: '972',
		description: 'Skol 300ML',
		shortDescription: 'Skol 300ML'
	};

	response.json(detail);
});

router.post('/', (_, response) => {
	response.json({ ok: 'OK' });
});

router.put('/:id', (_, response) => {
	response.json({ ok: 'OK' });
});

module.exports = router;
