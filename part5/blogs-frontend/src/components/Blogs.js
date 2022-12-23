import Blog from './Blog'

const Blogs = ({blogs, removeBlog, updateState }) => {

    return (<ul>
        { blogs.map(blog =>
            <Blog
                key={ blog.title }
                blog={ blog }
                removeBlog={ removeBlog }
                updateState={ (updatedBlog) => updateState(updatedBlog) }
            />
        ) }
    </ul>)
}

export default Blogs