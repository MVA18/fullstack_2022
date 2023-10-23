import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../reducers/userReducer";

const UserBlogsList = (props) => {
  const userId = useParams().id;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(userId));

  }, [dispatch]);

  const title = {
    display: "block",
    fontSize: 30,
    margin: "40px"
  };

  const paddingCount = {
    paddingLeft: "130px"
  };

  const paddingUser = {
    paddingLeft: "40px"
  };

  const userStyle = {
    display: "flex",
    paddingLeft: 10,
    paddingTop: 10
  };

  if (props.user) {
    return (
      <div>
        <div>
          <strong style={ title }>{ props.user.name }</strong>

          <strong>added blogs</strong>
          <ul>
            { props.user.blogs.map(blog => (
              <li key={ blog.id } style={ userStyle }>
                <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
              </li>
            )) }
          </ul>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  getUser
};

const ConnectedUserBlogsList = connect(mapStateToProps, mapDispatchToProps)(UserBlogsList);
export default ConnectedUserBlogsList;