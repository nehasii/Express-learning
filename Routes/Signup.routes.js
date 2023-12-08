const express = require('express');

const {
    addUsers,
    getUsers,
    login
} = require('../Controller/Signup.controller')
const {auth} = require('../Helper/auth.js')

console.log("routes");

let router = express.Router()

router.post('/addUsers',auth, addUsers)
router.get('/getUsers',auth, getUsers)
router.post('/login', login)


module.exports = router
