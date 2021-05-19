import React, { useState } from "react";
import Cookies from "js-cookie";

const CreatePost = () => {
  const [postText, setPostText] = useState();

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
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="CreatePost">
      <form>
        <input
          type="text"
          name="text"
          placeholder="Write a comment ..."
          onChange={(e) => setPostText(e.target.value)}
        />
        <button type="submit" onClick={fetchCreatePost}>
          Comment
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
