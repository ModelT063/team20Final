import Navbar from "../components/Navbar";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { userID, userInfoState, userOrganizations } from "@/lib/userData";
import { useRecoilValue, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { getOrgs } from "@/utils/userService";
import { Close, Edit } from "@mui/icons-material";

export default function Pii() {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useRecoilState(userInfoState);

  let userInfo = useRecoilValue(userInfoState);
  let id = useRecoilValue(userID);
  let orgs = useRecoilValue(userOrganizations);

  const titleStyles = {
    display: "flex",
    justifyContent: "space-between",
  };

  const alertStyles = {
    marginTop: "1rem",
  };

  const tableStyles = alertStyles;

  const actionStyles = {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column" as "column",
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (email == "" || firstName == "" || lastName == "") {
      setIsError(true);
      return;
    }
    let updatedUser = {
      Email: email,
      User_Type: userInfo[0]["User_Type"],
      User_Status: userInfo[0]["User_Status"],
      F_Name: firstName,
      L_Name: lastName,
      Points: userInfo[0]["Points"],
      Cart: {
        ids: userInfo[0]["Cart"],
      },
    };
    setInfo([updatedUser] as any);
    fetch(`http://localhost:3000/api/users/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    setIsUpdated(true);
  };
  return userInfo[0] == undefined ? (
    <CircularProgress />
  ) : (
    <>
      <div>
        <Navbar />
      </div>
      <h1>
        <center>Account Information</center>
      </h1>
      <center>
        {userInfo[0] && (
          <IconButton onClick={handleOpen}>
            <Edit />
          </IconButton>
        )}
      </center>
      <center>
        <table style={tableStyles}>
          <tr>
            <th>Name</th> <td>{userInfo[0] != undefined
                ? userInfo[0]["F_Name"] + " " + userInfo[0]["L_Name"]
                : "Unknown User"}</td></tr>
          <tr>
            <th>Email</th> <td>{userInfo[0] != undefined ? userInfo[0]["Email"] : "N/A"}</td></tr>
          <tr>
            <th>User Type</th> <td> {userInfo[0] != undefined
                ? userInfo[0]["User_Type"] == 0
                  ? "Driver"
                  : userInfo[0]["User_Type"] == 1
                  ? "Sponsor"
                  : "Admin"
                : "N/A"}</td></tr>
          <tr>
            <th>Points</th> <td>{userInfo[0] != undefined ? userInfo[0]["Points"] : "N/A"}</td></tr>
          <tr>
            <th>Organization(s)</th> <td>{orgs.length > 0
                ? orgs.map((org) => (
                    <div key={org["Organization_Name"]}>
                      <li>{org["Organization_Name"]}</li>
                    </div>
                  ))
                : "You don't belong to any organizations"}</td></tr>
        </table>
      </center>
      <Dialog open={isOpen}>
        <DialogTitle style={titleStyles}>
          Update Information
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            required
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="lastname"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            required
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions style={actionStyles}>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
          {isUpdated ? (
            <Alert style={alertStyles} severity="success">
              Your Information was Updated!
            </Alert>
          ) : isError ? (
            <Alert style={alertStyles} severity="error">
              Please fill out each field
            </Alert>
          ) : null}
        </DialogActions>
      </Dialog>
    </>
  );
}
