import Navbar from "../components/Navbar";

import { Amplify, Auth } from "aws-amplify";

import { Grid, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "../../aws-exports-fixed";
import { useRecoilState } from "recoil";
import { userInfoState, userID, userOrganizations } from "@/lib/userData";
import { useEffect } from "react";
import { getID, getInfo, getOrgs } from "@/utils/userService";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Box from "@mui/material/Box";
Amplify.configure(awsExports);

function App({ signOut, user }: { signOut: any; user: any }) {
  const [info, setInfo] = useRecoilState(userInfoState);
  const [id, setID] = useRecoilState(userID);
  const [orgs, setOrgs] = useRecoilState(userOrganizations);
  const name = user.attributes.name.split(" ");
  const data = {
    User_ID: user.attributes.sub,
    Email: user.attributes.email,
    F_Name: name[0],
    L_Name: name[1],
  };
  useEffect(() => {
    getID().then((data) => setID(data));
    getInfo().then((data) => setInfo(data));
    getOrgs().then((data) => setOrgs(data));
  }, []);

  useEffect(() => {
    fetch(`${process.env.APP_URL}/api/users/create/adduser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success: ", data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>

      <h1>
        <center>
          Welcome to Good Drivers, {data.F_Name} {data.L_Name}
        </center>{" "}
      </h1>
      <br></br>
      <br></br>

      <div>
        <center>
          <LocalShippingIcon fontSize="large"></LocalShippingIcon>
        </center>
        <br></br>
        <center>-- About Us --</center>
        <br></br>
        <center>
          <Box height={5} width={500}>
            Good Drivers was established in February 2023 in Clemson, South
            Carolina. Our mission is to provide our drivers with up-to-date
            technology to track their driving performance, purchase products,
            and to establish connections with their sponsors. This platform also
            provides opportuntiy for sponsoring companies to develop clientele
            with our drivers. Currenlty we are number one in the Southeastern
            United States region for truck driver assistance and performance.
          </Box>
        </center>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <center>
          <button onClick={signOut}>Sign out</button>
        </center>
      </div>
    </>
  );
}

export default withAuthenticator(App);
