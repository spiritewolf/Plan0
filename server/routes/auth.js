const express = require('express');
const router = express.Router();
const {signup, login, getUser} = require('../controllers/auth');
const auth = require('../jwt/jwtauth');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/user').get(auth, getUser);

module.exports = router;
