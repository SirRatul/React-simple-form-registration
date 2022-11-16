import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Blog from "../pages/Blog";
import Confirmation from "../pages/Confirmation";
import { AuthContext } from "../context/auth";
import { getStore } from "../utils";

const Navigation = () => {
  const AuthenticatedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          getStore("user") ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  };

  return (
    <AuthContext.Provider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/confirm" component={Confirmation} />
          <AuthenticatedRoute exact path="/" component={Home} />
          <AuthenticatedRoute exact path="/blog/new" component={Blog} />
          <Route path="*" component={Login} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default Navigation;
