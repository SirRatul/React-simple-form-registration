import React from "react";
import { connect } from "react-redux";
import { UserDetails, Welcome } from "../../components";
import { getStore } from "../../utils";

const Home = (props) => {
  const logout = (event) => {
    event.preventDefault();
    props.history.push("/login");
  };

  return (
    <div className="row">
      <div className="container-fluid">
        <Welcome user={props.profile} />
        <UserDetails user={props.profile} />
        {getStore("blog") &&
          getStore("blog").length > 0 &&
          getStore("blog").map((item, index) => {
            return (
              <div className="row" key={index}>
                <div className="col-12 mx-5 justify-content-start bg-secondary">
                  <h3 className="text-light">{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </div>
            );
          })}
        <button
          className="link-button"
          onClick={(event) => {
            event.preventDefault();
            props.history.push("/blog/new");
          }}
        >
          Compose A Blog
        </button>
        <button className="link-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
  };
};

export default connect(mapStateToProps)(Home);
