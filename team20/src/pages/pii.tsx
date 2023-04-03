import Navbar from "../components/Navbar";
import { UserInfo, UserType } from "@/types/user";
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

export default function pii() {
  const [userID, setUserID] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  useEffect( () => {
    async function getID() {
      const id = await Auth.currentAuthenticatedUser().then((data) => setUserID(data.username));
    }
    async function getInfo() {
      await getID();
      if (userID != "") {
        const res = await fetch(`http://localhost:3000/api/users/read/${userID}`)
        const info = await res.json();
        setUserInfo(info);
      }
    }
    getInfo();
  }, [userID, setUserInfo, setUserID]);
  return (
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
