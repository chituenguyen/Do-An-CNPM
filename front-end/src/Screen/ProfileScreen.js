import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { user_get_profile } from "../action/userAction";

function ProfileScreen() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  console.log(userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);
  dispatch(user_get_profile(userInfo.token));
  return <div></div>;
}

export default ProfileScreen;
