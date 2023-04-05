import { Auth } from "aws-amplify";

export async function getID() {
    const res = await Auth.currentAuthenticatedUser();
    const user = res.username;
    return user;
}

export async function getInfo() {
    let userID;
    await getID().then((data) => userID = data);
    if (userID != "") {
      const res = await fetch(`http://localhost:3000/api/users/read/${userID}`)
      const info = await res.json();
      return info;
    }
    return null;
}