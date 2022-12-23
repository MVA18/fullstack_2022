import {useState} from 'react'

const BlogForm = ({blogFormRef, createBlog}) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const resetState = () =>
    {
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    const handleTitleChange = (event) => { setNewTitle(event.target.value) }
    const handleAuthorChange = (event) => { setNewAuthor(event.target.value) }
    const handleUrlChange = (event) => { setNewUrl(event.target.value) }

    const addBlog = (event) => {
        event.preventDefault()

        blogFormRef.current.toggleVisibility()

        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl
        }

        createBlog(blogObject)
        resetState()
    }

    return(
        <div>
            <h2>Create a new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title: <input onChange={handleTitleChange} value={newTitle} placeholder='write blog title here'/>
                </div>
                <div>
                    author: <input onChange={handleAuthorChange} value={newAuthor} placeholder='write blog author here'/>
                </div>
                <div>
                    url: <input onChange={handleUrlChange} value={newUrl}  placeholder='write blog url here'/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm