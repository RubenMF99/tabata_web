const express = require ('express')
const router = express.Router()
const recoverController = require ('../controller/recoverController')
const {check} = require ('express-validator')

router.post('/',[
    check('email', 'Email required').isEmail(),
    ],
    recoverController.sendEmail
)
module.exports = router