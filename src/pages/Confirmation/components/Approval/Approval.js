import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { UserDetails } from "../../../../components";
import { setStore } from "../../../../utils";
import "./style.css";

const Approval = (props) => {
  const agree = () => {
    try {
      if (props.user.firstName) {
        setStore("user", props.user);
        alert("Congratulation your profile Completed successfully!");
        props.history.push("/");
      } else {
        alert("Invalid User Details!");
        props.history.push("/register");
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  return (
    <div className="rightPanel approvalcontainer">
      <UserDetails user={props.user} />
      <div className="aggreebtnContainer">
        <button type="button" className="button" onClick={agree}>
          Agree
        </button>
      </div>
    </div>
  );
};

Approval.propTypes = {
  user: PropTypes.object,
};

export default withRouter(Approval);
