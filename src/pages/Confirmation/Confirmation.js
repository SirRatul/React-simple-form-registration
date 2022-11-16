import React from "react";
import { connect } from "react-redux";
import Approval from "./components/Approval";

const Confirmation = (props) => {
  return (
    <div className="row">
      <Approval user={props.profile} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
  };
};

export default connect(mapStateToProps)(Confirmation);
