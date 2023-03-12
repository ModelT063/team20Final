import Navbar from "../components/Navbar";

import { Amplify } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "../../aws-exports-fixed";
Amplify.configure(awsExports);

// import addUser from "api/users/create/adduser";
const response = fetch('/api/users/read/24');
const data = response;
console.log(response);

function App({ signOut, user }: { signOut: any; user: any }) {
  // const callAPI = async () => {addUser};
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
