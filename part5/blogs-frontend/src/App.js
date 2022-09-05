import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from "./components/Notification"
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState({ message: '', type: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const hook = () => {
    blogService.getAll()
        .then(initialBlogs=> { setBlogs(initialBlogs) })
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
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage({message: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setNotificationMessage({message: '', type: '' })
      }, 5000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogappUser')
    window.location.href = '/';
  }


  const blogList = () => (
      <div>
          <h2>Blogs list</h2>
          <Blogs blogs={ blogs }></Blogs>
      </div>
  )

  const loginForm = () => {
      return (
          <Togglable buttonLabel='login'>
              <LoginForm
                  username={ username }
                  password={ password }
                  handleUsernameChange={ ({target}) => setUsername(target.value) }
                  handlePasswordChange={ ({target}) => setPassword(target.value) }
                  handleSubmit={ handleLogin }
              />
          </Togglable>
      )
  }

  const newBlogForm = () => {
      return (
          <div>
              <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
              <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm blogFormRef = { blogFormRef } blogs={ blogs } setBlogs={ setBlogs } setNotificationMessage={ setNotificationMessage }/>
              </Togglable>
          </div>
      )
  }

  return (
      <div>
          <h2>Blogs</h2>
          <Notification notificationMessage={notificationMessage} />
          {user === null ? loginForm() : (<> {newBlogForm()} {blogList()} </>)}
      </div>
  )
}

export default App
