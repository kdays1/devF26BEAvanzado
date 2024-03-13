const express = require('express')
const router = express.Router()
const {createUser, loginUser, datosUser} = require('../controllers/usersControllers')
const { protect } = require('../middleware/authMiddleware')


router.post('/', createUser)
router.post('/login', loginUser)
router.get('/datos', protect, datosUser)

module.exports = router