import Navbar from "../components/Navbar";
import { CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Alert} from "@mui/material";
import { Edit, Close } from "@mui/icons-material";
import { userInfoState, userOrganizations } from "@/lib/userData";
import { useRecoilValue, useRecoilState } from "recoil";
import { useState } from "react";
import { userID } from "@/lib/userData";

export default function pii() {

  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isUpdated, setIsUpdated] = useState(false);

  const titleStyles = {
    display: "flex",
    justifyContent: "space-between"
  };

  const alertStyles = {
    marginTop: "1rem"
  }

  const actionStyles = {
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'column' as 'column',
  };

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }
  
  const handleSubmit = () => {
    if (email == '' || firstName == '' || lastName == '') {
      return;
    }
    let updatedUser = {
      Email: email,
      User_Type: userInfo[0]['User_Type'],
      User_Status: userInfo[0]['User_Status'],
      F_Name: firstName,
      L_Name: lastName,
      Points: userInfo[0]['Points'],
      Cart: {
        ids: userInfo[0]['Cart']
      }
    }
    fetch(`http://localhost:3000/api/users/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser)
    });
    setIsUpdated(true);
  }
  let userInfo = useRecoilValue(userInfoState);
  let id = useRecoilValue(userID);
  let orgs = useRecoilValue(userOrganizations)
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
      {userInfo[0] && <IconButton onClick = {handleOpen} children = {<Edit />}/>}
      <Dialog open={isOpen}>
        <DialogTitle style = {titleStyles}>Update Information
          <IconButton children = {<Close/>} onClick = {handleClose}/>
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
            onChange={e => {
              setFirstName(e.target.value)
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
            onChange={e => {
              setLastName(e.target.value)
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
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions style={actionStyles}>
          <Button onClick={handleSubmit} variant = 'contained'>Save</Button>
          {isUpdated ? <Alert style = {alertStyles} severity = 'success'>Your Information was Updated!</Alert> : null}
        </DialogActions>
      </Dialog>
    </>
  );
}
