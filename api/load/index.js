const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance();

const getRandomLoadList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			map: chance.pad(chance.integer({min: 0, max: 999999}), 6),
			type: 1,
			vehicle: chance.string({ length: 3, alpha: true, casing: 'upper' }) + chance.pad(chance.integer({min: 0, max: 9999}), 4),
			deliveryDate: chance.date({string: true, american: false}),
			box: 'BOX' + chance.pad(chance.integer({min: 1, max: 99}), 2),
			warehouse: {
				id: chance.hash(),
				name: 'BR' + chance.string({ length: 2, alpha: true, casing: 'upper' })
			},
			status: chance.integer({min: 0, max: 10})
		});
	}

	return list;
};

router.get('/', (request, response) => {
	const loadList = getRandomLoadList();
	response.json({
		data: loadList,
		numberOfRecords: chance.integer({min: 15, max: 150})
	});
});

module.exports = router;
