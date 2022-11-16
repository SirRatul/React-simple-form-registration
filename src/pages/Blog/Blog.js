import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ActionCreators } from "../../actions/profile";
import { getStore, setStore } from "../../utils";

const Blog = (props) => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState({
    blog: {
      title: "You must give a title of a blog",
      content: "You must give a content of a blog",
    },
  });
  const [submitted, setSubmitted] = useState(false);

  const validationErrorMessage = (event) => {
    const { name, value } = event.target;
    let temp = { ...errors };

    switch (name) {
      case "title":
        temp.blog.title = value.length < 1 ? "Enter Title" : "";
        break;
      case "content":
        temp.blog.content = value.length < 1 ? "Enter content" : "";
        break;
      default:
        break;
    }

    setErrors(temp);
  };

  const inputChange = (event) => {
    const { name, value } = event.target;
    const temp = { ...blog };
    temp[name] = value;
    setBlog(temp);
    validationErrorMessage(event);
  };

  const validateForm = (errors) => {
    let valid = true;
    Object.entries(errors.blog).forEach((item) => {
      console.log(item);
      item && item[1].length > 0 && (valid = false);
    });
    return valid;
  };

  const submitForm = async (event) => {
    setSubmitted(true);
    props.dispatch(ActionCreators.formSubmittionStatus(true));
    event.preventDefault();
    if (validateForm(errors) && props.profile) {
      console.log(blog);
      const previous = getStore("blog");
      if (!previous) {
        setStore("blog", [blog]);
        props.history.push("/");
      } else {
        if (previous.some((element) => element.title === blog.title)) {
          alert("You have already a blog with this title");
        } else {
          setStore("blog", [...previous, blog]);
          props.history.push("/");
        }
      }
    } else {
      console.log("Invalid Form");
    }
  };

  return (
    <div className="pagecenter container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-5 bg-secondary">
          <div className="col-md-12">
            <form onSubmit={submitForm}>
              <div className="row justify-content-center align-items-center">
                <div className="form-group">
                  <label className="col-form-label">Title</label>
                  <input
                    type="text"
                    value={blog.title}
                    name="title"
                    onChange={(e) => {
                      inputChange(e);
                    }}
                    className="form-control"
                    placeholder="Title"
                  />
                  {submitted && errors.blog.title.length > 0 && (
                    <span className="error">{errors.blog.title}</span>
                  )}
                </div>
              </div>
              <div className="row justify-content-center align-items-center">
                <div className="form-group">
                  <label htmlFor="content" className="col-form-label">
                    Content
                  </label>
                  <textarea
                    type="text"
                    value={blog.content}
                    name="content"
                    onChange={(e) => {
                      inputChange(e);
                    }}
                    rows="4"
                    className="form-control"
                    id="content"
                    placeholder="Enter content"
                  />
                  {submitted && errors.blog.content.length > 0 && (
                    <span className="error">{errors.blog.content}</span>
                  )}
                </div>
              </div>
              <div className="row justify-content-center align-items-center">
                <button type="button" className="button" onClick={submitForm}>
                  Submit
                </button>
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

export default connect(mapStateToProps)(withRouter(Blog));
