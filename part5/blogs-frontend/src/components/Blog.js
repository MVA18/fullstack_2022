import Togglable from "./Togglable"

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogHeadingStyle = {
    display: 'flex'
  }

return (
  <div style={blogStyle}>
    {blog.title}
    <Togglable buttonLabel='view' buttonCancel='hide'>
      <div> 
        {blog.url}
      </div>
      <div> 
        likes {blog.likes}
        <button key={'btn_likes'}>like</button>
      </div>
      <div>
        {blog.author}
      </div>
    </Togglable>

  </div>
)}

export default Blog