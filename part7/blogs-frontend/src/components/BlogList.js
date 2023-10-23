import { connect, useDispatch } from "react-redux";
import { initializeBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer';
import { useEffect } from "react";
import { Link } from "react-router-dom";

const BlogList = (props) => {

    const dispatch = useDispatch();

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

    return (
        <ul>
            { blogs().map(blog =>
                <div key={ blog.id }>
                    <div>
                        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
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
    initializeBlogs
}

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)
export default ConnectedBlogList