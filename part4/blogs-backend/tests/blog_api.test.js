const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})


describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)
        expect(contents).toContain('React patterns' )
    })
})

describe('viewing a specific blog', () => {
    test('a specific blog can be viewed', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

        expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
        const usersAtStart = await helper.usersInDb()
        const user = usersAtStart[0]

        const token = await helper.getToken(user)

        const newBlog = {
            title: 'Test',
            author: 'test',
            url: 'https://test.test/',
            likes: 7
        }

        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token )
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const title = blogsAtEnd.map(n => n.title)
        expect(title).toContain('Test')
    })

    test('a valid blog cannot be added without token', async () => {

        const newBlog = {
            title: 'Test',
            author: 'test',
            url: 'https://test.test/',
            likes: 7
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('a blog is updated', async () => {

        const updateBlog = {
            title: 'Test',
            author: 'test',
            url: 'https://test.test/',
            likes: 7
        }

        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const returnedBlog = await api
            .put(`/api/blogs/${blogToView.id}`)
            .send(updateBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(updateBlog))

        processedBlogToView['id'] = blogToView.id

        expect(returnedBlog.body).toEqual(processedBlogToView)
    })

    test('if likes property is missing it is set to 0', async () => {
        const usersAtStart = await helper.usersInDb()
        const userToView = usersAtStart[0]

        const token = await helper.getToken(userToView)

        const newBlog = {
            title: 'Test',
            author: 'test',
            url: 'https://test.test/'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]

        expect(lastBlog['likes']).toEqual( 0 )
    })

    test('if title and url is missing error code 400 is returned', async () => {
        const usersAtStart = await helper.usersInDb()
        const userToView = usersAtStart[0]

        const token = await helper.getToken(userToView)

        const newBlog = {
            author: 'test',
            likes: 123
        }

        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deletion of a blog', () => {
    test('a blog can be deleted', async () => {
        const usersAtStart = await helper.usersInDb()
        const userToView = usersAtStart[0]

        const token = await helper.getToken(userToView)

        const newBlog = {
            title: 'Test',
            author: 'test',
            url: 'https://test.test/',
            likes: 12
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const block = response.body

        await api
            .delete(`/api/blogs/${block.id}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length
        )

        const contents = blogsAtEnd.map(r => r.content)

        expect(contents).not.toContain(block.title)
    })
})

afterAll(async () => {
    await mongoose.disconnect()
})