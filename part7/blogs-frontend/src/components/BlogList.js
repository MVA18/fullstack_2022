import { connect, useDispatch } from "react-redux";
import { initializeBlogs, removeBlog, likeBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer';
import { useEffect } from "react";

const BlogList = (props) => {

    const dispatch = useDispatch();
    const like = (blog) => {
        dispatch(likeBlog(blog));
        dispatch(setNotification(`you voted '${blog.title}'`, 5000));
    }

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch, setNotification]);


    const blogs = () => {
        let blogs = props.blogs
        if (props.filter) {
            blogs = props.blogs.filter(blog => {
                return blog.title.toLowerCase().includes(props.filter.toLowerCase())
            })
        }
        return blogs.slice().sort(function (a, b) {
            return b['likes'] - a['likes']
        })
    }

    const remove = (blog) => {
        dispatch(removeBlog(blog));
    }

    return (
        <ul>
            { blogs().map(blog =>
                <div key={ blog.id }>
                    <div>
                        { blog.title }
                    </div>
                    <div>
                        has { blog.likes }
                        <button onClick={ () => like(blog) }>like</button>
                        <button onClick={ () => remove(blog) }>delete</button>
                    </div>
                </div>
            ) }
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    likeBlog,
    removeBlog,
    setNotification,
    initializeBlogs
}

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)
export default ConnectedBlogList