const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util');

const getRandomItemList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			name: chance.character({ alpha: true, casing: 'upper' }) + chance.character({ alpha: true, casing: 'upper' }) + chance.character({ alpha: true, casing: 'upper' }),
			description: chance.sentence({ words: 2, alpha: true, casing: 'upper' }),
			conversionFactor: chance.floating({ min: 0, max: 99999, fixed: 2 }),
			item: {
				id: chance.hash(),
				code: chance.integer({ min: 0, max: 99999 }),
				description: chance.sentence({ words: 2, alpha: true, casing: 'upper' })
			}
		});
	}

	return list;
};

router.get('/', (request, response) => {
	const returnEmptyList = request.query.query && chance.bool();
	const itemList = returnEmptyList ? [] : getRandomItemList();
	const responseContent = defaultListResponse(itemList, returnEmptyList ? 0 : chance.integer({ min: 15, max: 150 }));
	response.json(responseContent);
});

router.delete('/:id', (_, response) => {
	response.json({ OK: 'YES!' });
});

router.get('/:id', (_, response) => {
	const detail = {
		id: 'a3c701042b5f-a3c701042b5f-a3c701042b5f-a3c701042b5f',
		item: {
			id: '31f8e196-5660-42cf-8010-a3c701042b5f',
			code: '972',
			description: 'Skol 300ML'
		},
		type: 1,
		conversionFactor: 1.12,
		layers: 4,
		weight: 4.3,
		resupplyRuleProfile: {
			description: 'Working asset',
			id: '84198817-8efc-4e26-b6c5-a48801117138'
		},
		storageRuleProfile: {
			description: 'Working asset',
			id: '84198817-8efc-4e26-b6c5-a48801117138'
		},
		pickingRuleProfile: {
			description: 'Working asset',
			id: '84198817-8efc-4e26-b6c5-a48801117138'
		},
		controlUnit: false,
		movementUnit: true,
		receivingUnit: true,
		pickingUnit: false
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
