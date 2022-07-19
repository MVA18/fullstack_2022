const Note = require('../models/note')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const superUser = [
        {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }
    ]

const initialNotes = [
    {
        content: 'HTML is easy',
        date: new Date(),
        important: false
    },
    {
        content: 'Browser can execute only Javascript',
        date: new Date(),
        important: true
    }
]

const notesInDb = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
}


const nonExistingId = async () => {
    const blog = new Blog({
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    })

    await blog.save()
    await blog.remove()

    return blog._id.toString()
}


const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const getToken = ( user ) => {

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    // token expires in 60*60 seconds, that is, in one hour
    return jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60*60 }
    )
}

module.exports = {
    initialNotes, notesInDb, initialBlogs, blogsInDb, nonExistingId, usersInDb, getToken
}