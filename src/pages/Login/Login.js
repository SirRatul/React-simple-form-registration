import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ActionCreators } from "../../actions/profile";
import { getStore } from "../../utils";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "Enter User Name!",
    password: "Enter Password!",
  });
  const [loginStatus, setLoginStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (errors) => {
    let valid = true;
    Object.entries(errors).forEach((item) => {
      item && item[1].length > 0 && (valid = false);
    });
    return valid;
  };

  const validationErrorMessage = (event) => {
    const { name, value } = event.target;
    let temp = { ...errors };
    switch (name) {
      case "username":
        temp.username = value.length < 1 ? "Enter User Name" : "";
        break;
      case "password":
        temp.password = value.length < 1 ? "Enter Password" : "";
        break;
      default:
        break;
    }
    setErrors(temp);
  };

  const inputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    validationErrorMessage(event);
  };

  const loginForm = async (event) => {
    setSubmitted(true);
    event.preventDefault();
    if (validateForm(errors)) {
      const user = getStore("user");
      if (user.email === username && user.password === password) {
        props.dispatch(ActionCreators.login(user));
        props.history.push("/");
      } else {
        setLoginStatus("Login Failed! Invalid Username and Password");
      }
    } else {
      alert("Invalid Form");
    }
  };

  return (
    <div className="pagecenter container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-5 bg-secondary">
          <div className="col-md-12">
            <form onSubmit={loginForm}>
              <div className="row justify-content-center align-items-center">
                <div className="form-group">
                  <label htmlFor="username" className="col-form-label">
                    User Name:
                  </label>
                  <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={(e) => {
                      inputChange(e);
                    }}
                    className="form-control"
                    id="username"
                    placeholder="User Name"
                  />

                  {submitted && errors.username.length > 0 && (
                    <span className="error">{errors.username}</span>
                  )}
                </div>
              </div>
              <div className="row justify-content-center align-items-center">
                <div className="form-group">
                  <label htmlFor="password" className="col-form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    value={password}
                    autoComplete="on"
                    name="password"
                    onChange={(e) => {
                      inputChange(e);
                    }}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                  {submitted && errors.password.length > 0 && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>
              </div>
              <div className="row justify-content-center align-items-center">
                {submitted && loginStatus.length > 0 && (
                  <span className="error">{loginStatus}</span>
                )}
              </div>
              <div className="row justify-content-center align-items-center">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <div className="row justify-content-end align-items-center">
                <a
                  className="text-right text-light text-decoration-none"
                  href="/register"
                >
                  Register
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
  };
};

export default connect(mapStateToProps)(withRouter(Login));
