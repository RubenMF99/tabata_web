const express = require ('express')
const router = express.Router()
const userController = require ('../controller/userController')
const {check} = require ('express-validator')

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email required').isEmail(),
    check('sexo', 'select required').not().isEmpty(),
    check('password', 'password minimum 8 characters').isLength({min: 8})
    ],
    userController.newUser
)

module.exports = router