const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/profiles', require('./profiles'));
router.use('/business-units', require('./businessUnits'));
router.use('/specs/domains', require('./providers'));
router.use('/specs/permissions', require('./profiles'));
router.use('/totems', require('./totems'));
router.use('/load-types', require('./loadTypes'));
router.use('/motoristas', require('./driver'));
router.use('/transportadoras', require('./carrier'));
router.use('/vehicle-categories', require('./vehicleCategory'));
router.use('/vehicle-types', require('./vehicleType'));
router.use('/products', require('./product').router);
router.use('/sessions', require('./sessions'));
router.use('/veiculos', require('./vehicles').router);
router.use('/unidades-negocio', require('./unidadeNegocio').router);
router.use('/pontos-carregamento', require('./pontosCarregamento'));
router.use('/itinerarios', require('./itinerarios'));
router.use('/order-queue', require('./lista-pedidos'));
router.use('/latest-drivers-called', require('./ultimos-motoristas-chamados'));

module.exports = router;

/*
router.use('/nome-da-rota', require('./nome-da-pasta'));

nome-da-pasta -> é a pasta onde está as configurações pra essa rota, o que ela vai retornar para o front

*/