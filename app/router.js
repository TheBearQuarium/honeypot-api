'use strict';

const Nodal = require('nodal');
const router = new Nodal.Router();
const relationships = Nodal.require('app/relationships.js');

/* Middleware */
/* executed *before* Controller-specific middleware */

const CORSMiddleware = Nodal.require('middleware/cors_middleware.js');
// const CORSAuthorizationMiddleware = Nodal.require('middleware/cors_authorization_middleware.js');
// const ForceWWWMiddleware = Nodal.require('middleware/force_www_middleware.js');
// const ForceHTTPSMiddleware = Nodal.require('middleware/force_https_middleware.js');

router.middleware.use(CORSMiddleware);
// router.middleware.use(CORSAuthorizationMiddleware);
// router.middleware.use(ForceWWWMiddleware);
// router.middleware.use(ForceHTTPSMiddleware);

/* Renderware */
/* executed *after* Controller-specific renderware */

const GzipRenderware = Nodal.require('renderware/gzip_renderware.js')

router.renderware.use(GzipRenderware);

/* Routes */

const IndexController = Nodal.require('app/controllers/index_controller.js');

/* generator: begin imports */

const UsersController = Nodal.require('app/controllers/users_controller.js');
const V1ItemsController = Nodal.require('app/controllers/v1/items_controller.js');
const V1PetsController = Nodal.require('app/controllers/v1/pets_controller.js');
const V1PetTypesController = Nodal.require('app/controllers/v1/pet_types_controller.js');
const V1TransactionsController = Nodal.require('app/controllers/v1/transactions_controller.js');
const V1LevelsController = Nodal.require('app/controllers/v1/levels_controller.js');
const V1TotalsController = Nodal.require('app/controllers/v1/totals_controller.js');
const V1AccessTokensController = Nodal.require('app/controllers/v1/access_tokens_controller.js');
const V1BankTokensController = Nodal.require('app/controllers/v1/bank_tokens_controller.js');
const V1PetStatsController = Nodal.require('app/controllers/v1/pet_stats_controller.js');

/* generator: end imports */

router.route('/').use(IndexController);

/* generator: begin routes */

router.route('/users/{id}').use(UsersController);
router.route('/v1/items/{id}').use(V1ItemsController);
router.route('/v1/pets/{id}').use(V1PetsController);
router.route('/v1/pet_types/{id}').use(V1PetTypesController);
router.route('/v1/transactions/{id}').use(V1TransactionsController);
router.route('/v1/levels/{id}').use(V1LevelsController);
router.route('/v1/totals/{id}').use(V1TotalsController);
router.route('/v1/access_tokens/{id}').use(V1AccessTokensController);
router.route('/v1/bank_tokens/{id}').use(V1BankTokensController);
router.route('/v1/pet_stats/{id}').use(V1PetStatsController);

/* generator: end routes */

module.exports = router;
