import {useState} from "react";
import blogsService from "../services/blogs";

const BlogForm = ({blogFormRef, blogs, setBlogs, setNotificationMessage}) => {

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
        blogFormRef.current.toggleVisibility()
        event.preventDefault()

        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl
        }

        blogsService.create(blogObject).then(returnedPerson => {
            setBlogs(blogs.concat(returnedPerson))
            setNotificationMessage({message:`Blog '${blogObject.title}' was successfully added by '${blogObject.author}'`, type: 'success'})
            setTimeout(() => { setNotificationMessage({message : null, type : null}) },5000)
            resetState()
        })
    }

    return(
        <div>
            <h2>Create a new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title: <input onChange={handleTitleChange} value={newTitle}/>
                </div>
                <div>
                    author: <input onChange={handleAuthorChange} value={newAuthor} />
                </div>
                <div>
                    url: <input onChange={handleUrlChange} value={newUrl} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm;