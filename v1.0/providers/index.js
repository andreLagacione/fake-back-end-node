const router = require('express').Router()
	, { defaultListResponse } = require('../../util');

router.get('/', (_, response) => {
	const identityProviders = [
		{
			id: '1',
			descricao: 'Active Directory da Votorantim'
		},
		{
			id: '2',
			descricao: 'Plataforma "Gestão de Pátio"'
		}
	];
	const responseContent = defaultListResponse(identityProviders);
	response.json(responseContent);
});

module.exports = router;
