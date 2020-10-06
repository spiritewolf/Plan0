const express = require('express');
const router = express.Router();
const {getTasks, addTask, deleteTask} = require('../controllers/tasks');
const auth = require('../jwt/jwtauth');

router.route('/tasks').get(auth, getTasks).post(auth, addTask);
router.route('/tasks/:id').delete(auth, deleteTask);
module.exports = router;
