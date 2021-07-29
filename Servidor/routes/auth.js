const express = require ('express')
const router = express.Router()
const authController = require ('../controller/authController')
const {check} = require ('express-validator')

router.post('/',[
    check('email', 'Email required').isEmail(),
    check('password', 'password minimum 8 characters').isLength({min: 8})
    ],
    authController.authUser
)

module.exports = router