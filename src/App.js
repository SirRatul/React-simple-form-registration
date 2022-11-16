import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Header, Footer } from "./components";
import Navigation from "./navigation";
import { getStore } from "./utils";
import { ActionCreators } from "./actions/profile";
import "./styles";
import "bootstrap/dist/css/bootstrap.min.css";

const App = (props) => {
  useEffect(() => {
    const user = getStore("user");
    if (user) {
      props.dispatch(ActionCreators.login(user));
    }
  }, []);

  return (
    <div>
      <Header />
      <Navigation />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
  };
};

export default connect(mapStateToProps)(App);
