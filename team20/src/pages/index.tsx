import Navbar from "../components/Navbar";

import { Amplify } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "../../aws-exports-fixed";
Amplify.configure(awsExports);

function App({ signOut, user }: { signOut: any; user: any }) {
  sessionStorage.setItem('CognitoUser', JSON.stringify(user));
  const name = user.attributes.name.split(" ");
  const data = {
    User_ID: user.attributes.sub, Email: user.attributes.email,
    F_Name: name[0], L_Name: name[1]
  };
  fetch("http://localhost:3000/api/users/create/adduser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success: ", data);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  return (
    <>
      <div>
        <Navbar />
        <button onClick={signOut}>Sign out</button>
      </div>
      <h1>HOMEPAGE!!</h1>
      <h1>Hello {user.username}</h1>
    </>
  );
}

export default withAuthenticator(App);
