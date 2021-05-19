import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./showComments.css";
import { Link } from "react-router-dom";

const ShowComments = () => {
  const id = Cookies.get("currentUserId");
  const [arrayPost, setArrayPost] = useState([]);

  const fetchDisplayPost = () => {
    fetch("http://localhost:1337/posts", {
      method: "get",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((postdata) => {
        setArrayPost(postdata);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchDisplayPost();
  }, []);

  const fetchDeletePost = (thepost) => {
    fetch(`http://localhost:1337/posts/${thepost}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => fetchDisplayPost())
      .catch((err) => console.log(err));
  };

  return (
    <div className="DisplayPost">
      <h3>Our {arrayPost.length} posts :</h3>

      {arrayPost.map((post) => (
        <li>
          <Link to={"/user/" + post.user.id}>{post.user.username}</Link>

          <br />
          <br />
          {post.text}
          <br />
          {post.user.id == id && (
            <div>
              <button type="button" onClick={() => fetchDeletePost(post.id)}>
                ❌
              </button>
            </div>
          )}
        </li>
      ))}
    </div>
  );
};

export default ShowComments;
