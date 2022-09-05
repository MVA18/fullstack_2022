import Blog from "./Blog";

const Blogs = ({blogs, removeBlog}) => {

    return(<ul>
        {blogs.map(blog =>
            <Blog key={blog.title} blog={blog} removeBlog={removeBlog}/>
        )}
    </ul>)
}

export default Blogs;