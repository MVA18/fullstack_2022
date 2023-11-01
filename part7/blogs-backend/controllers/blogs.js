const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require("../models/comment");
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate({
        path: 'comments',
        populate: {
            path: 'user',
            select: 'username', // Include only the 'username' field from the 'User' model
        },
        select: 'content user',
    })
      .exec();
    blog ? response.json(blog) : response.status(404).end()
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body.newBlog
    const user = await User.findById(response.user)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).end();
    }

    blog.user.toString() === response.user.id ? await Blog.findByIdAndRemove(request.params.id) : response.status(403).end()

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

blogsRouter.post('/comments', async (request, response) => {
    const { blog, comment, user } = request.body
    const blogStored = await Blog.findById(blog)
    const userStored = await User.findById(user)

    if (userStored && blogStored) {
        const newComment = new Comment({
            content: comment,
            blog: blog,
            user: user,
        })

        const savedComment= await newComment.save()
        blogStored.comments = blogStored.comments.concat(savedComment._id)
        await blogStored.save()

        response.status(201).json(savedComment)
    }
    response.status(404).json('User or Blog not found')
})

module.exports = blogsRouter