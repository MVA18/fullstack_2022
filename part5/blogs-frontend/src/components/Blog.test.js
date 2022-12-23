import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const newBlog = () => {
    return {
        title: 'Blog title',
        author: 'author',
        url: 'some.url',
        likes: 5
    }
}

const updateLikeBlog = (likes) => {
    return {
        title: 'Blog title',
        author: 'author',
        url: 'some.url',
        likes: likes + 1
    }
}

const getBlogElements = (blog) => {

    const title = screen.getByText(blog.title)
    const url = screen.getByText(blog.url)
    const likes = screen.getByText('likes ' + blog.likes)
    const author = screen.getByText(blog.author)

    return {title, url, likes, author}
}

test('renders blog component', () => {

    const blog = newBlog()

    render(<Blog blog={ blog }/>)

    const blogElements = getBlogElements(blog)

    expect(blogElements.title).toBeDefined()
    expect(blogElements.url).toBeDefined()
    expect(blogElements.likes).toBeDefined()
    expect(blogElements.author).toBeDefined()

    expect(blogElements.title).toBeVisible()
    expect(blogElements.url).not.toBeVisible()
    expect(blogElements.likes).not.toBeVisible()
    expect(blogElements.author).not.toBeVisible()
})


test('Toggle component shows and hides correct content', async () => {
    const blog = newBlog()

    render(
        <Blog key={ blog.title }
              blog={ blog }/>
    )

    const user = userEvent.setup()

    const btnView = screen.getByText('view')
    const btnHide = screen.getByText('hide')

    const blogElements = getBlogElements(blog)

    expect(blogElements.title).toBeVisible()
    expect(blogElements.url).not.toBeVisible()
    expect(blogElements.likes).not.toBeVisible()
    expect(blogElements.author).not.toBeVisible()

    await user.click(btnView)

    expect(blogElements.title).toBeVisible()
    expect(blogElements.url).toBeVisible()
    expect(blogElements.likes).toBeVisible()
    expect(blogElements.author).toBeVisible()

    await user.click(btnHide)

    expect(blogElements.title).toBeVisible()
    expect(blogElements.url).not.toBeVisible()
    expect(blogElements.likes).not.toBeVisible()
    expect(blogElements.author).not.toBeVisible()
})

test('blog like button working', async () => {
    const blog = newBlog()

    const mockCallback = jest.fn()
    const user = userEvent.setup()

    render(<Blog key={ blog.title } blog={ blog } updateState={ mockCallback }/>)

    const btnView = screen.getByText('view')
    const btnLike = screen.getByText('like')

    await user.click(btnView)

    expect(btnLike).toBeVisible

    await user.click(btnLike)
    await user.click(btnLike)

    expect(mockCallback.mock.calls).toHaveLength(2)
})