import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EditProfile from "./editProfile";
import Cookies from "js-cookie";
import "./profile.css";
import dayjs from "dayjs";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [userPost, setUserPost] = useState([]);
  const loged = useSelector((state) => state.userReducer.loged);
  const history = useHistory();
  const id = Cookies.get("currentUserId");

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

  fetch(`http://localhost:1337/posts?user.id=${id}`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      setUserPost(response);
    });

  useEffect(() => {
    myProfileDisplay();
  }, []);

  return (
    <>
      {loged ? (
        <>
          <div className="Myprofile">
            <h1>
              Hello
              <span className="nameCurrentUser">"{currentUser.username}"</span>
            </h1>
            <h3 className="emailprofil">{currentUser.email}</h3>
            <EditProfile />
          </div>
          <h2 className="post">My Lastest Posts ({userPost.length}) :</h2>
          {userPost.map((post) => (
            <div className="DisplayPost">
              <div className="cardComment">
                <div className="titleUserComment user">
                  {post.user.username}
                </div>

                <div className="contentUserComment">
                  <div classname="comment">
                    <div className="text">{post.text}</div>

                    <div>
                      <quote className="quote">
                        {dayjs(post.created_at).format("DD MMMM YYYY")}
                      </quote>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        history.push("/login")
      )}
    </>
  );
};

export default Profile;
