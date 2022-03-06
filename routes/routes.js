const express = require('express');
const router = express.Router();

const app = express();

const HomeController = require('../controllers/HomeController');
const UserController = require('../controllers/UserController');

router.get('/', HomeController.index);

router.get('/user', UserController.findUsers);
router.get('/user/:id', UserController.findUser);

router.post('/user', UserController.create);

module.exports = router;
