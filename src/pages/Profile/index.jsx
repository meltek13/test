import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "./profile.css";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState("");
  const loged = useSelector((state) => state.userReducer.loged);
  const history = useHistory();

  const myProfileDisplay = () => {
    fetch("http://localhost:1337/users/me", {
      method: "get",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setCurrentUser(response);
      });
  };

  useEffect(() => {
    myProfileDisplay();
  }, []);

  return (
    <>
      {loged ? (
        <div className="Myprofile">
          <h1>
            Hello{" "}
            <span className="nameCurrentUser">"{currentUser.username}"</span>
          </h1>{" "}
          <h3>{currentUser.email}</h3>
        </div>
      ) : (
        history.push("/login")
      )}
    </>
  );
};

export default Profile;
