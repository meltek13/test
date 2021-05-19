import React from "react";
import { useSelector } from "react-redux";
import Jumbotron from "components/Jumbotron";
import CreatePost from "components/createPost";
import ShowComments from "components/showComments";
const Home = () => {
  const loged = useSelector((state) => state.userReducer.loged);

  return (
    <div className="Home">
      {loged ? (
        <>
          <Jumbotron />
          <CreatePost />
          <ShowComments />
        </>
      ) : (
        <Jumbotron />
      )}
    </div>
  );
};

export default Home;
