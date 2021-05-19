import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "pages/Home";
import Register from "pages/Register";
import Login from "pages/Login";
import Profile from "pages/Profile";
import Navbar from "components/NavBar";
import { Provider } from "react-redux";
import store from "./redux/store";
import OtherProfiles from "pages/otherProfiles";

const App = () => (
  <Router>
    <main>
      <Provider store={store}>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/user/:User_Id">
            <OtherProfiles />
          </Route>
        </Switch>
      </Provider>
    </main>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));
