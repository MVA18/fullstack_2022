import { connect } from 'react-redux';
import { upvoteBlog } from '../reducers/blogsReducer'
import { removeBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer';

const BlogList = (props) => {
    const blogs = () => {
        let blogs = props.blogs
        if (props.filter) {
            blogs = props.blogs.filter(blog => {
                return blog.content.toLowerCase().includes(props.filter.toLowerCase())
            })
        }
        return blogs.slice().sort(function (a, b) {
            return b['votes'] - a['votes']
        })
    }

    const vote = (blog) => {
        props.upvoteBlog(blog)
        props.setNotification(`you voted '${ blog.content }'`, 5000)
    }

    const remove = (blog) => {
        props.removeBlog(blog)
        props.setNotification(`you deleted '${ blog.content }'`, 5000)
    }

    return (
        <ul>
            { blogs().map(blog =>
                <div key={ blog.id }>
                    <div>
                        { blog.content }
                    </div>
                    <div>
                        has { blog.votes }
                        <button onClick={ () => vote(blog) }>vote</button>
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
    upvoteBlog,
    removeBlog,
    setNotification,
}

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)
export default ConnectedBlogList