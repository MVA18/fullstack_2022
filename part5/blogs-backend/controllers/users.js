const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)
    user ? response.json(user) : response.status(404).end()
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'    })
    }

    if (password.length <= 3) {
        return response.status(400).json({
            error: 'password must be at least 3 characters long.'    })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

usersRouter.put('/:id', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = {
        username: body.username,
        name: body.name,
        passwordHash: passwordHash,
    }

    const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
    response.json(updatedUser)
})

module.exports = usersRouter