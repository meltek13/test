import { LOG_IN, LOG_OUT, CURRENT_USER } from "./userType";

export const logIn = () => {
  return {
    type: LOG_IN,
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

export const currentUser = ({ id, username, email }) => {
  return {
    type: CURRENT_USER,
    id,
    username,
    email,
  };
};
