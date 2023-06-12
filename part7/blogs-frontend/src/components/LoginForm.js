import { login } from "../reducers/loginReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";
import Notification from "./Notification";
import React from "react";

const LoginForm = (props) => {

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const responsePromise = props.login({ username, password });

    responsePromise.then(response => {
      if (response.status === 200) {
        props.setNotification('Login successful', 5000);
      } else if (response.status === 401) {
        const message = 'Incorrect login credentials';
        props.setNotification(message, 5000);
      }
      else if (response.status === 500) {
        const message = 'Unknown error occurred';
        props.setNotification(message, 5000);
      }
    });
  };

  return (
    <><Notification />
      <form onSubmit={ handleLogin }>
        <div>
          username
          <input
            id="username"
            type="text"
            name="username"
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            name="password"
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  login,
  setNotification
};

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm);
export default ConnectedLoginForm;
