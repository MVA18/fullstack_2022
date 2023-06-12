import React, { useEffect } from 'react';
import App from '../App';
import LoginForm from '../components/LoginForm';
import loginService from '../services/login';
import { connect } from 'react-redux';
import { set } from "../reducers/loginReducer";

const LoginPage = (props) => {
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    console.log(JSON.parse(loggedUserJSON))
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      props.set(user);
      loginService.setToken(user.token);
    }
  }, []);

  return (
    <>
      { props.loggedInUser.token === null ? (
        <LoginForm />
      ) : <App></App> }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
  }
}

const mapDispatchToProps = {
  set
};

const ConnectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default ConnectedLoginPage;
