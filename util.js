const Chance = require('chance')
	, chance = new Chance();

exports.defaultListResponse = (data, numberOfRecords) => (data);

exports.dateGenerator = (chance) => {
	const day = chance.integer({ min: 1, max: 31 });
	const defaultMonths = [1, 3, 5, 7, 8, 10, 12]
	if (day < 31) {
		defaultMonths.push(4, 6, 9, 11);
	}

	if (day < 28) {
		defaultMonths.push(2);
	}

	const month = defaultMonths[chance.integer({ min: 0, max: defaultMonths.length - 1 })];

	return [
		('0' + day).slice(-2),
		'/',
		('0' + month).slice(-2),
		'/',
		chance.year({min: 1980, max: 2030})
	].join('');
};

function gera_random(n) {
	var ranNum = Math.round(Math.random() * n);
	return ranNum;
}

exports.cnpjGenerator = (formatted = false) => {
	var n = 9;
	var n1 = gera_random(n);
	var n2 = gera_random(n);
	var n3 = gera_random(n);
	var n4 = gera_random(n);
	var n5 = gera_random(n);
	var n6 = gera_random(n);
	var n7 = gera_random(n);
	var n8 = gera_random(n);
	var n9 = 0;//gera_random(n);
	var n10 = 0;//gera_random(n);
	var n11 = 0;//gera_random(n);	
	var n12 = 1;//gera_random(n);		
	var d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
	d1 = 11 - (mod(d1, 11));
	if (d1 >= 10) d1 = 0;
	var d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
	d2 = 11 - (mod(d2, 11));
	if (d2 >= 10) d2 = 0;

	if (formatted)
		return '' + n1 + n2 + '.' + n3 + n4 + n5 + '.' + n6 + n7 + n8 + '/' + n9 + n10 + n11 + n12 + '-' + d1 + d2;
	else
		return '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + n10 + n11 + n12 + d1 + d2;
}

exports.horariosGenerator = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			horaInicio: chance.hour({twentyfour: true}) + ':' + chance.minute() + ':' + chance.millisecond(),
			horaFim: chance.hour({twentyfour: true}) + ':' + chance.minute() + ':' + chance.millisecond(),
		});
	}

	return list;
};

exports.cadastroAutomaticoListGenerator = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			cif: chance.bool(),
			cifRetira: chance.bool(),
			fob: chance.bool(),
			transferencia: chance.bool()
		});
	}

	return list;
};

exports.cadastroAutomaticoGenerator = () => {
	return {
		cif: chance.bool(),
		cifRetira: chance.bool(),
		fob: chance.bool(),
		transferencia: chance.bool()
	};
};

exports.tipoCarregamentoListGenerator = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			descricao: chance.sentence({ words: 5 })
		});
	}

	return list;
};

exports.regiaoListGenerator = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			descricao: chance.sentence({ words: 5 }),
			codigo: chance.ssn({ dashes: false })
		});
	}

	return list;
};

exports.bloqueiosListGenerator = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			motoristaId: chance.integer({ min: 1, max: 100000}),
			descMotivoBloqueio: chance.sentence({ words: 5 }),
			flgPossuiTreinamento: chance.integer({ min: 1, max: 2 }),
			motivoBloqueio: chance.sentence({ words: 5 }),
			dataBloqueio: chance.date({ year: 2018 }),
			dataLiberacao: chance.date({ year: 2018 })
		});
	}

	return list;
};

exports.biometriasListGenerator = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			motoristaId: chance.integer({ min: 1, max: 100000}),
			descricao: chance.sentence({ words: 5 }),
			dataCadastro: chance.date({ year: 2018 }),
			flgPossuiTreinamento: chance.integer({ min: 1, max: 2 }),
			motivoBloqueio: chance.sentence({ words: 5 }),
			dataLiberacao: chance.date({ year: 2018 }),
			biometria: chance.hash(),
			hashBiometria: chance.integer({ min: 1, max: 2 })
		});
	}

	return list;
};

exports.treinamentosListGenerator = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			motoristaId: chance.integer({ min: 1, max: 100000}),
			nomeTreinamento: chance.sentence({ words: 5 }),
			observacoesTreinamento: chance.sentence({ words: 5 }),
			datIntegracao: chance.date({ year: 2018 }),
			validadeTreinamento: chance.date({ year: 2018 }),
			flgPossuiTreinamento: chance.bool(),
			observacoesTreinamento: chance.sentence({ words: 5 })
		});
	}

	return list;
};

exports.obrigatoriosViagem = () => {
	return {
		compressor: chance.bool(),
		descargaFumaca: chance.bool(),
		chapa: chance.bool(),
		munck: chance.bool()
	}
}