// routes index

const Router = require('koa-router');
const router = new Router();
const Ctrl = require('../controllers/sailing');

router.get('/', Ctrl.findAll);

module.exports = router;
