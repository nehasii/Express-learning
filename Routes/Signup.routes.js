const express = require('express');

const {
    addUsers,
    getUsers,
    login
} = require('../Controller/Signup.controller')

console.log("routes");

let router = express.Router()

router.post('/addUsers', addUsers)
router.get('/getUsers', getUsers)
router.post('/login', login)


module.exports = router
