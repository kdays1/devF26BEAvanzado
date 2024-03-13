const asyncHandler = require('express-async-handler')
const Task = require('../models/tareasModel')

const getTareas = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id})
    res.status(200).json(tasks)
})

const createTareas = asyncHandler(async (req, res) => {

    if (!req.body.description) {
        res.status(400)
        throw new Error('Please add a description')
    }

    const task = await Task.create({
        description: req.body.description,
        user: req.user.id
    })

    // const tasks = await Task.find({ user: req.user.id})
    res.status(200).json(task)
})

const updateTareas = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)
    if (!task) {
        res.status(400)
        throw new Error('That task does not exists')
    }

    if(tareasModel.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    } else {
        const taskUpdated = await Task.findByIdAndUpdate(re.params.id, req.body, {new: true})
        res.status(200).json({ mensaje: `Modificar la tarea con id ${req.params.id}` })
    }

})

const deleteTareas = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)

    if(!task) {
        res.status(400)
        throw new Error('That task does not exists')
    }

    if(tareasModel.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    } else {
        // await Task.deleteOne(task)
        const taskDeleted = await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({ id : req.params.description})
    // const taskDeleted = await Task.findByIdAndDelete(req.params.id)
    }
})


module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
}
