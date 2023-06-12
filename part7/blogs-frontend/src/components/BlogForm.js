import { connect } from "react-redux";
import { createNewBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";
const BlogForm = (props) => {
    const createBlog = async (event) => {
        event.preventDefault()
        const content = event.target.blog.value
        event.target.blog.value = ''
        props.createNewBlog(content)
        props.setNotification(`Create blog: ${content}`, 5000)
    }

    return (
        <>
            <h2>create new blog</h2>
            <form onSubmit={createBlog}>
                <div><input name={'blog'}/></div>
                <button type={'submit'}>create</button>
            </form>
        </>
    )
}

const mapDispatchToProps = {
    createNewBlog,
    setNotification,
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)
export default ConnectedBlogForm