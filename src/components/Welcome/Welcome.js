import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const Welcome = (props) => {
  return (
    <div className="marquee">
      <p>
        Welcome {props.user.firstName} {props.user.lastName} !
      </p>
    </div>
  );
};

Welcome.propTypes = {
  user: PropTypes.object,
};

export default Welcome;
