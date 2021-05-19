import React from "react";
import "./jumbotron.css";
import { Link } from "react-router-dom";

const Jumbotron = () => {
  return (
    <div className="nav_and_jumbo">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <div className="wrapper">
            <h1 className="display-4 title_jumbotron typing-demo">
              <span className="react">REACT</span> SOCIAL NETWORK
            </h1>
          </div>
          <p className="lead">
            Welcome on My Social Network. This website is a training to Redux
            and React. <br /> We use auth and routing to create a small social
            media website.
          </p>

          <Link to={"/login"}>
            <button className="btn_login">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Jumbotron;
