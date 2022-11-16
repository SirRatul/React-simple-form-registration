import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const UserDetails = (props) => {
  const { firstName, lastName, email } = props.user;
  return (
    <div className="row">
      <div className="col-12 text-center">
        I am{" "}
        <span className="bindtext">
          {firstName} {lastName}
        </span>{" "}
        and you can send your emails to{" "}
        <span className="bindtext">{email}</span>.
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  user: PropTypes.object,
};

export default UserDetails;
