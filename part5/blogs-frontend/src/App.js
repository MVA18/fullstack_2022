import {useState, useEffect, useRef} from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [notificationMessage, setNotificationMessage] = useState({message: '', type: ''})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const blogFormRef = useRef()

    const hook = () => {
        blogService.getAll()
            .then(initialBlogs => {
                const filteredBlogs = initialBlogs.sort(function (a, b) {
                    return b['likes'] - a['likes']
                })

                setBlogs(filteredBlogs)
            })
    }

    const filterByLikes = (initialBlogs) => {
        const filteredBlogs = initialBlogs.sort(function (a, b) {
            return b['likes'] - a['likes']
        })

        setBlogs(filteredBlogs)
    }

    const removeBlog = (removedBlog) => {
        if (window.confirm('Remove blog ' + removedBlog.title + ' by ' + removedBlog.author)) {
            blogService.remove(removedBlog.id).then(response => {
                if (response.status === 204) {
                    const updatedBlogs = blogs.filter((blog) => {
                        if (blog.id !== removedBlog.id) {
                            return blog
                        }
                    })
                    setBlogs(updatedBlogs)
                }
            })
        }

    }

    useEffect(hook, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])


    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username, password})

            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setNotificationMessage({message: 'Wrong credentials', type: 'error'})
            setTimeout(() => {
                setNotificationMessage({message: '', type: ''})
            }, 5000)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('loggedBlogappUser')
        window.location.href = '/'
    }

    const createBlog = (newBlog) => {
        blogService.create(newBlog).then(response => {
            if (response.status === 201) {
                const returnedBlog = response.data
                setBlogs(blogs.concat(returnedBlog))
                setNotificationMessage({
                    message: `Blog '${ returnedBlog.title }' was successfully added by '${ returnedBlog.author }'`,
                    type: 'success'
                })
                setTimeout(() => {
                    setNotificationMessage({message: null, type: null})
                }, 5000)
            }
        })
    }

    const updateState = (updatedBlog) => {
        blogService.update(updatedBlog.id, updatedBlog).then(response => {
            if (response.status === 200) {
                const updatedBlogs = blogs.map(blog => {
                    if (blog.id === updatedBlog.id) {
                        return updatedBlog
                    }
                    return blog
                })
                filterByLikes(updatedBlogs)
            }
        })
    }

    const blogList = () => (<div>
        <h2>Blogs list</h2>
        <Blogs
            blogs={ blogs }
            removeBlog={ removeBlog }
            updateState={ (updatedBlog) => updateState(updatedBlog) }
        >
        </Blogs>
    </div>)

    const loginForm = () => {
        return (<Togglable buttonLabel='login'>
            <LoginForm
                username={ username }
                password={ password }
                handleUsernameChange={ ({target}) => setUsername(target.value) }
                handlePasswordChange={ ({target}) => setPassword(target.value) }
                handleSubmit={ handleLogin }
            />
        </Togglable>)
    }

    const newBlogForm = () => {
        return (<div>
            <p>{ user.name } logged-in
                <button onClick={ handleLogout }>
                    logout
                </button>
            </p>
            <Togglable buttonLabel='new blog' ref={ blogFormRef }>
                <BlogForm
                    blogFormRef={ blogFormRef }
                    createBlog={ (newBlog) => createBlog(newBlog) }
                />
            </Togglable>
        </div>)
    }

    return (<div>
        <h2>Blogs</h2>
        <Notification notificationMessage={ notificationMessage }/>
        { user === null ? loginForm() : (<> { newBlogForm() } { blogList() } </>) }
    </div>)
}

export default App
