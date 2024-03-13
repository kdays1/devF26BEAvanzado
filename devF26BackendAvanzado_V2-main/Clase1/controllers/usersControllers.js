const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const createUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Data is missing')
    }

    //verify that email does not exists
    const userExists = await User.findOne({email: email})
    if (userExists) {
        res.status(400)
        throw new Error('Email exists already in the DB')
    }

    //Do the hash 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email: email,
        password : hashedPassword
    })

    if(user) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Data could not be saved')
    }

    // res.status(201).json({mensaje: 'User created'})
})

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    //verificar que exista un usuario con ese email
    const user = await User.findOne({ email })

    //si el usuario existe verificamos tambien el password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }

})

const datosUser = asyncHandler(async (req,res) => {
    res.status(200).json(req.user)
})

const generarToken = (id_usuario) => {
    return jwt.sign({ id_usuario }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    createUser,
    loginUser,
    datosUser
}