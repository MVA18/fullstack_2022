import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBlog } from "../reducers/blogReducer";

const Blog = (props) => {
  const blogId = useParams().id;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlog(blogId));

  }, [dispatch]);

  const title = {
    display: "block",
    fontSize: 30,
    margin: "40px"
  };

  if (props.blog) {
    return (
      <div>
        <div>
          <strong style={ title }>Title: { props.blog.title }</strong>
          <strong style={ title }>Author: { props.blog.author }</strong>
          <strong style={ title }>URL: <Link to={'/' + props.blog.url}>{ props.blog.url }</Link></strong>
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
  getBlog
};

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog);
export default ConnectedBlog;