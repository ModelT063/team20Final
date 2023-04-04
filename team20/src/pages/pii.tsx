import Navbar from "../components/Navbar";
import { UserInfo, UserType } from "@/types/user";
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { CircularProgress } from "@mui/material";
import { getID, getInfo } from "@/utils/userService";

export default function pii() {
  const [userID, setUserID] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  useEffect( () => {
    getID().then((data) => setUserID(data));
    getInfo().then((data) => setUserInfo(data));
  }, [userID, setUserInfo, setUserID]);
  return (userInfo[0] == undefined ? <CircularProgress/> :
    <>
      <div>
        <Navbar />
      </div>
      <h1>User Information</h1>
      <h3>Name: {userInfo[0] != undefined ? userInfo[0].F_Name + " " + userInfo[0].L_Name : "Unknown User"}</h3>
      <h3>Email Address: {userInfo[0] != undefined ? userInfo[0].Email : "N/A"}</h3>
      <h3>User Type: {userInfo[0] != undefined ? (userInfo[0].User_Type == 0 ? "Driver" : (userInfo[0].User_Type == 1 ? "Sponsor" : "Admin"))  : "N/A"}</h3>
      <h3>Points: {userInfo[0] != undefined ? userInfo[0].Points : "N/A"}</h3>
    </>
  );
}
