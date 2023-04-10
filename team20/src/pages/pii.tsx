import Navbar from "../components/Navbar";
import { CircularProgress } from "@mui/material";
import { userInfoState } from "@/lib/userData";
import { useRecoilValue, useRecoilState } from "recoil";
import { useEffect } from "react";
import { getOrgs } from "@/utils/userService";
import { userOrganizations } from "@/lib/userData";

export default function pii() {
  let userInfo = useRecoilValue(userInfoState);
  const [orgs, setOrgs] = useRecoilState(userOrganizations)
  useEffect( () => {
    getOrgs().then((data) => setOrgs(data));
  }, []);
  console.log(orgs);
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
      <h3>Organization(s): {orgs.length > 0  ?  orgs.map((org) => <li>{org['Organization_Name']}</li>) : "You don't belong to any organizations"}</h3>
    </>
  );
}
