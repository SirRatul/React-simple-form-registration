import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ActionCreators } from "../../actions/profile";
import { isValidEmail } from "../../utils";

const Register = (props) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    user: {
      firstName: "Enter First Name",
      email: "Email is not valid!",
      password: "Enter your password",
    },
  });
  const [submitted, setSubmitted] = useState(false);

  const validationErrorMessage = (event) => {
    const { name, value } = event.target;
    let temp = { ...errors };

    switch (name) {
      case "firstName":
        temp.user.firstName = value.length < 1 ? "Enter First Name" : "";
        break;
      case "email":
        temp.user.email = isValidEmail(value) ? "" : "Email is not valid!";
        break;
      case "password":
        temp.user.password = value.length < 1 ? "Enter your password" : "";
        break;
      default:
        break;
    }

    setErrors(temp);
  };

  const inputChange = (event) => {
    const { name, value } = event.target;
    const temp = { ...user };
    temp[name] = value;
    setUser(temp);
    validationErrorMessage(event);
  };

  const validateForm = (errors) => {
    let valid = true;
    Object.entries(errors.user).forEach((item) => {
      item && item[1].length > 0 && (valid = false);
    });
    return valid;
  };

  const submitForm = async (event) => {
    setSubmitted(true);
    props.dispatch(ActionCreators.formSubmittionStatus(true));
    event.preventDefault();
    if (validateForm(errors) && props.profile) {
      props.dispatch(ActionCreators.addProfile(user));
      props.history.push("/confirm");
    } else {
      alert("Invalid Form");
    }
  };

  return (
    <div className="pagecenter container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-5 bg-secondary">
          <div className="col-md-12">
            <form>
              <div className="row justify-content-center align-items-center">
                <div className="form-group">
                  <label className="col-form-label">First Name</label>
                  <input
                    type="text"
                    value={user.firstName}
                    name="firstName"
                    onChange={(e) => {
                      inputChange(e);
                    }}
                    className="form-control"
                    placeholder="First Name"
                  />
                  {submitted && errors.user.firstName.length > 0 && (
                    <span className="error">{errors.user.firstName}</span>
                  )}
                </div>
              </div>
              <div className="row justify-content-center align-items-center">
                <div className="form-group">
                  <label className="col-form-label">Last Name</label>
                  <input
                    type="text"
                    value={user.lastName}
                    name="lastName"
                    onChange={(e) => {
                      inputChange(e);
                    }}
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="row justify-content-center align-items-center">
                <div className="form-group">
                  <label htmlFor="email" className="col-form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    name="email"
                    onChange={(e) => {
                      inputChange(e);
                    }}
                    className="form-control"
                    id="email"
                    placeholder="someone@gmail.com"
                  />
                  {submitted && errors.user.email.length > 0 && (
                    <span className="error">{errors.user.email}</span>
                  )}
                </div>
              </div>
              <div className="row justify-content-center align-items-center">
                <div className="form-group">
                  <label htmlFor="password" className="col-form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    value={user.password}
                    name="password"
                    onChange={(e) => {
                      inputChange(e);
                    }}
                    className="form-control"
                    id="password"
                  />
                  {submitted && errors.user.password.length > 0 && (
                    <span className="error">{errors.user.password}</span>
                  )}
                </div>
              </div>
              <div className="row justify-content-center align-items-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={submitForm}
                >
                  Submit
                </button>
              </div>
              <div className="row justify-content-end align-items-center">
                <a
                  className="text-right text-light text-decoration-none"
                  href="/login"
                >
                  Login
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

export default connect(mapStateToProps)(withRouter(Register));
