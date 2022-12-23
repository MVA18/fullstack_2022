import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const blogFormRef = {
        current: {
            toggleVisibility: jest.fn().mockReturnThis()
        }
    };

    const user = userEvent.setup()

    render(<BlogForm blogFormRef={ blogFormRef } blogs={ [] } createBlog={ createBlog }/>)

    const inputTitle = screen.getByPlaceholderText('write blog title here')
    const inputAuthor = screen.getByPlaceholderText('write blog author here')
    const inputUrl = screen.getByPlaceholderText('write blog url here')

    await user.type(inputTitle, 'blog title')
    await user.type(inputAuthor, 'blog author')
    await user.type(inputUrl, 'blog url')

    const btnCreate = screen.getByText('add')

    await user.click(btnCreate)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('blog title')
    expect(createBlog.mock.calls[0][0].author).toBe('blog author')
    expect(createBlog.mock.calls[0][0].url).toBe('blog url')
})