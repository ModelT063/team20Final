import Navbar from "../components/Navbar";
import { CircularProgress } from "@mui/material";
import { userInfoState, userOrganizations } from "@/lib/userData";
import { useRecoilValue, useRecoilState } from "recoil";
import { useEffect } from "react";
import { getOrgs } from "@/utils/userService";

export default function pii() {
  let userInfo = useRecoilValue(userInfoState);
  let orgs = useRecoilValue(userOrganizations)
  console.log(orgs);
  return (userInfo[0] == undefined ? <CircularProgress/> :
    <>
      <div>
        <Navbar />
      </div>
      <h1><center>User Information</center></h1>
      <center><table>
        <tr>
        <th>Name</th> 
        <th>Email</th> 
        <th>User Type</th> 
        <th>Points</th> 
        <th>Organization(s):</th></tr>
        
        <tr>
          <td>{userInfo[0] != undefined ? userInfo[0]['F_Name'] + " " + userInfo[0]['L_Name'] : "Unknown User"}</td>
          <td>{userInfo[0] != undefined ? userInfo[0]['Email'] : "N/A"}</td>
          <td>{userInfo[0] != undefined ? (userInfo[0]['User_Type'] == 0 ? "Driver" : (userInfo[0]['User_Type'] == 1 ? "Sponsor" : "Admin"))  : "N/A"}</td>
          <td>{userInfo[0] != undefined ? userInfo[0]['Points'] : "N/A"}</td>
          <td>{orgs.length > 0  ?  orgs.map((org) => <li>{org['Organization_Name']}</li>) : "You don't belong to any organizations"}</td>
        </tr>
        </table></center>
    </>
  );
}
