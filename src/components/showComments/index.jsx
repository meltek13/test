import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./showComments.css";
import { Link } from "react-router-dom";
import "./showComments.css";
import dayjs from "dayjs";

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
  const triByDate = arrayPost.sort(function (a, b) {
    a = new Date(a.created_at);
    b = new Date(b.created_at);
    return a > b ? -1 : a < b ? 1 : 0;
  });

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
      <h2 className="post">The Lastest Posts ({arrayPost.length}) :</h2>

      {arrayPost.map((post) => (
        <div className="cardComment">
          <Link to={"/user/" + post.user.id} className="test">
            <div className="titleUserComment user">{post.user.username}</div>
          </Link>
          <div className="contentUserComment">
            <div classname="comment">
              <div className="text">{post.text}</div>

              <div>
                <quote className="quote">
                  {dayjs(post.created_at).format("DD MMMM YYYY")}
                </quote>
              </div>
            </div>
            {post.user.id == id && (
              <div>
                <button
                  className="btnDelete"
                  type="button"
                  onClick={() => fetchDeletePost(post.id)}
                >
                  ❌
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowComments;
