const express = require('express');
const { registerUser, loginUser, findUser, users, deleteUser } = require('./auth');
const router = express.Router();

router.post('/register',registerUser);
router.post('/login', loginUser);
router.get('/find/:id', findUser);
router.get('/users', users);
router.delete('/delete/:id', deleteUser);

module.exports = router;