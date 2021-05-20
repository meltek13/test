import React from "react";
import "./jumbotronConnected.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const Jumbotron = () => {
  return (
    <div className="nav_and_jumbo2">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <div className="wrapper">
            <h1 className="display-4 title_jumbotron2 typing-demo">
              Hello{" "}
              <span className="react">
                {Cookies.get("currentUserUserName")}
              </span>
            </h1>
          </div>
          <p className="lead">
            Welcome on My Social Network. This website is a training to Redux
            and React. <br /> We use auth and routing to create a small social
            media website.
          </p>

          <Link to={"/profile"}>
            <button className="btn_login">My profil</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Jumbotron;
