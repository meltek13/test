import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { React, useState, useEffect } from "react";

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
    <div>
      <div className="OtherProfile">
        <h2>Profil de l`auteur:</h2>
        <p>{userInfo.username}</p>
        <p>{userInfo.email}</p>

        {userPost.map((post) => (
          <li key={post.id} style={{ listStyleType: "none" }}>
            {post.user.username}

            <br />
            {post.text}
          </li>
        ))}
      </div>
    </div>
  );
};

export default OtherProfiles;
