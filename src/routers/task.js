const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
router.get('/test', (req, res) => {
    res.send('Its working')
})

router.post('/Task-Manipulation', async (req, res) => {
    const myTask = new Task(req.body)

    try {
        await myTask.save()
        res.status(201).send(myTask)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/Task-Manipulation', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/Task-Manipulation/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    }catch (e) {
        res.status(500).send()
    }
})

router.patch('/Task-Manipulation/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['task', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!!'})
    }

    try {
        const task  = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if (!task) {
            return res.status(400).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/Task-Manipulation/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task) 
    }catch (e) {
        res.status(500).send()
    }
})


module.exports = router