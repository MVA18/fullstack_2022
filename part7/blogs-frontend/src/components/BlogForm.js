import { connect } from "react-redux";
import { createNewBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";
const BlogForm = (props) => {
    const navigate = useNavigate()
    const createBlog = async (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value
        const user = props.loggedInUser
        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''
        const newBlog = {title, author, url};
        props.createNewBlog({newBlog, user})
        navigate('/blogs')
        props.setNotification(`Created blog: ${newBlog.title}`, 5000)
    }

    return (
        <>
            <h2>create new blog</h2>
            <form onSubmit={createBlog}>
                <label>title</label>
                <div><input name={'title'}/></div>
                <label>author</label>
                <div><input name={'author'}/></div>
                <label>url</label>
                <div><input name={'url'}/></div>
                <button type={'submit'}>create</button>
            </form>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
    }
}

const mapDispatchToProps = {
    createNewBlog,
    setNotification,
}

const ConnectedBlogForm = connect(mapStateToProps, mapDispatchToProps)(BlogForm)
export default ConnectedBlogForm