import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { React, useState, useEffect } from "react";
import "./otherProfiles.css";
import dayjs from "dayjs";

const OtherProfiles = () => {
  const { User_Id } = useParams();
  const [userInfo, setUserInfo] = useState([]);
  const [userPost, setUserPost] = useState([]);

  const UserInfo = () => {
    fetch(`http://localhost:1337/users/${User_Id}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setUserInfo(response);
      });
  };

  fetch(`http://localhost:1337/posts?user.id=${User_Id}`, {
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

  useEffect(() => UserInfo(), []);

  return (
    <>
      <div className="OtherProfile">
        <h2>Profil</h2>
        <p>{userInfo.username}</p>
        <p>{userInfo.email}</p>
      </div>

      {userPost.map((post) => (
        <div className="DisplayPost">
          <div className="cardComment">
            <div className="titleUserComment user">{post.user.username}</div>

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
  );
};

export default OtherProfiles;
