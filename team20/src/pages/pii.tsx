import Navbar from "../components/Navbar";
import { CircularProgress } from "@mui/material";
import { userInfoState } from "@/lib/userData";
import { useRecoilValue } from "recoil";

export default function pii() {
  let userInfo = useRecoilValue(userInfoState);
  return (userInfo[0] == undefined ? <CircularProgress/> :
    <>
      <div>
        <Navbar />
      </div>
      <h1>User Information</h1>
      <h3>Name: {userInfo[0] != undefined ? userInfo[0]['F_Name'] + " " + userInfo[0]['L_Name'] : "Unknown User"}</h3>
      <h3>Email Address: {userInfo[0] != undefined ? userInfo[0]['Email'] : "N/A"}</h3>
      <h3>User Type: {userInfo[0] != undefined ? (userInfo[0]['User_Type'] == 0 ? "Driver" : (userInfo[0]['User_Type'] == 1 ? "Sponsor" : "Admin"))  : "N/A"}</h3>
      <h3>Points: {userInfo[0] != undefined ? userInfo[0]['Points'] : "N/A"}</h3>
    </>
  );
}
