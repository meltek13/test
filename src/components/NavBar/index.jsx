import React from "react";
import "./navbar.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "redux/index";
import Cookies from "js-cookie";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loged = useSelector((state) => state.userReducer.loged);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logOut());
    Cookies.remove("token");
    history.push("/");
  };
  return (
    <div>
      {loged ? (
        <nav className="navbar navbar-expand-lg navbar-light ">
          <a className="navbar-brand">Melbook</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={handleClick}>
                  Se deconnecter
                </a>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg navbar-light ">
          <a className="navbar-brand">Melbook</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
