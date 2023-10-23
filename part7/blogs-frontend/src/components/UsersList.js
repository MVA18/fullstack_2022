import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeUsers } from "../reducers/usersReducer";
import { Link, useNavigate } from "react-router-dom";

const UserList = (props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const users = () => {
    return props.users;
  };

  const title = {
      display: 'block',
      fontSize: 30,
      margin: "40px"
  };

  const itemPaddingLeft = {
    paddingLeft: "130px"
  };

  const userStyle = {
    display: "flex",
  };

  const userTableStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const itemStyle = {
    display: "flex",
    gap: 10,
    padding: 10
  };

  const userNameStyle = {
    width: 100,
  };

  // const blogsCount = () => {
  //     props.getuserBlogs(blog)
  // }

  return (
    <div>
      <strong style={ title }>Blogs</strong>

        <strong style={{marginLeft: '50px'}}>User Name</strong>
        <strong style={ itemPaddingLeft }>blogs created</strong>
        <ul style={ userTableStyle }>
          { users().map(user =>
            <li key={ user.id } style={ userStyle }>
              <div style={ itemStyle }>
                <Link style={ userNameStyle } to={`/user/${user.id}`}>{user.name}</Link>
                <div style={ itemPaddingLeft }>
                  { user.blogs.length }
                </div>
              </div>
            </li>
          ) }
        </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

const ConnectedUserList = connect(mapStateToProps, {})(UserList);
export default ConnectedUserList;