const express = require('express');
const router = express.Router();
const {getTransactions, addTransaction, deleteTransaction} = require('../controllers/transactions');
const auth = require('../jwt/jwtauth');

router.route('/transactions').get(auth, getTransactions).post(auth, addTransaction);
router.route('/transactions/:id').delete(auth, deleteTransaction);

module.exports = router;
