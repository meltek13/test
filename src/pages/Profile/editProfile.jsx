/* eslint-disable max-len */
/* eslint-disable no-console */
import { React, useState } from "react";
import Cookies from "js-cookie";

const EditProfile = () => {
  const id = Cookies.get("currentUserId");
  const username = Cookies.get("currentUserUserName");
  const email = Cookies.get("currentUserEmail");
  const [newUsername, setUsername] = useState(username);
  const [newEmail, setEmail] = useState(email);

  const fetchEditedProfile = (e) => {
    e.preventDefault();

    const data = {
      id,
      newUsername,
      newEmail,
    };

    fetch("http://localhost:1337/users/me", {
      method: "put",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
        Cookies.set("currentUserId", response.id);
        Cookies.set("currentUserEmail", response.email);
        Cookies.set("currentUserUserName", response.username);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditProfile">
      <h3>Wanna update your profile ? </h3>
      <form>
        <p>Your name</p>
        <input
          type="text"
          name="username"
          placeholder="Put your username here"
          value={newUsername}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>Your email</p>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={newEmail}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <input type="password" name="password" placeholder="password" value={newPassword} onChange={(e) => setPassword(e.target.value)} /> */}
        <button
          type="submit"
          className="btn_confirm"
          onClick={fetchEditedProfile}
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
