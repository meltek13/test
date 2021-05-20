import React, { useState } from "react";
import Cookies from "js-cookie";
import "./createPost.css";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const [postText, setPostText] = useState();
  const history = useHistory();

  const id = Cookies.get("currentUserId");

  const fetchCreatePost = (e) => {
    e.preventDefault();

    const data = {
      text: postText,
      user: id,
    };

    fetch("http://localhost:1337/posts", {
      method: "post",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((postdata) => {
        console.log(postdata);
        history.go(0);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="CreatePost">
      <form className="formComment">
        <input
          type="text"
          name="text"
          placeholder="Something to say ... ?"
          className="textAreaComment"
          onChange={(e) => setPostText(e.target.value)}
        />
        <button
          className="btnSubmitComment "
          type="submit"
          onClick={fetchCreatePost}
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
