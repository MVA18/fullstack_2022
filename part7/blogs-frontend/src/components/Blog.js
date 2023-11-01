import { Link, useNavigate, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBlog, likeBlog } from "../reducers/blogReducer";
import { removeBlog } from "../reducers/blogsReducer";
import { createNewComment } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = (props) => {
  const blogId = useParams().id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlog(blogId));
  }, [dispatch, blogId]);

  const title = {
    display: "block",
    fontSize: 30,
    margin: "40px"
  };

  const Comment = {
    border: "1px solid",
    marginBottom: '5px',
    paddingLeft: '10px'
  };

  const navigate = useNavigate();
  const remove = (blog) => {
    dispatch(removeBlog(blog));
    navigate("/blogs");
  };

  const addComment = async (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    const user = props.loggedInUser;
    const blog = props.blog;
    props.createNewComment({ blog, comment, user });
    props.setNotification(`Comment created`, 5000);
  };

  const like = (blog) => {
    dispatch(likeBlog(blog));

  };

  if (props.blog) {
    return (
      <div>
        <div>
          <strong style={ title }>Title: { props.blog.title }</strong>
          <strong style={ title }>Author: { props.blog.author }</strong>
          <strong style={ title }>URL: <Link to={ "/" + props.blog.url }>{ props.blog.url }</Link></strong>
          <button onClick={ () => like(props.blog) }>like</button>
          has { props.blog.likes } likes
          <div>
            <button onClick={ () => remove(props.blog) }>delete</button>
          </div>

          {/* Display comments */}
          <div>
            <h3>Comments:</h3>
            {props.blog.comments.map(comment => (
              <div key={comment.id} style={ Comment }>
                <p>{comment.content}</p> <p>Author: {comment.user.username}</p>
              </div>
            ))}
          </div>

          <form onSubmit={ addComment }>
            <input name={ "comment" }></input>
            <button type={ "submit" }>Comment</button>
          </form>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    blog: state.blog,
    loggedInUser: state.loggedInUser
  };
};

const mapDispatchToProps = {
  getBlog,
  likeBlog,
  setNotification,
  removeBlog,
  createNewComment
};

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog);
export default ConnectedBlog;