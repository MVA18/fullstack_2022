import { useEffect } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from "./components/BlogList";
import UsersList from "./components/UsersList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import {initializeBlogs} from "./reducers/blogsReducer";
import {initializeUsers} from "./reducers/usersReducer";
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <Notification/>
      <h2>Blogs</h2>
      <Filter/>
      <BlogList/>
      <BlogForm/>
      <h2>Users</h2>
      <UsersList/>
    </div>
  )
}

export default App