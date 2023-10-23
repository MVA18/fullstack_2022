import { Link, useNavigate, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBlog, likeBlog } from "../reducers/blogReducer";
import { removeBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = (props) => {
  const blogId = useParams().id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlog(blogId));
  }, [dispatch, setNotification]);

  const title = {
    display: "block",
    fontSize: 30,
    margin: "40px"
  };

  const navigate = useNavigate()
  const remove = (blog) => {
    dispatch(removeBlog(blog))
    navigate('/blogs')
    // dispatch(setNotification(message, 5000));
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
          <button onClick={ () => like(props.blog) }>like</button> has { props.blog.likes } likes
          <div>
            <button onClick={ () => remove(props.blog) }>delete</button>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    blog: state.blog
  };
};

const mapDispatchToProps = {
  getBlog,
  likeBlog,
  setNotification,
  removeBlog,
};

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog);
export default ConnectedBlog;