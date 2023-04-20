import React, { Component, useState, useEffect } from 'react';
import { UserType } from '@/types/user';
import NotFoundPage from '@/components/404'
import { CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import { userID, userInfoState, userOrganizations } from "@/lib/userData";
import { useRecoilValue, useRecoilState } from "recoil";

/*class DriverAppUpload extends Component {
  state = {
    userType: "",
    userID: "",
  }
*/
export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event:any) => {
    //const [selectedFile, setSelectedFile] = useState(null);
    setSelectedFile(event.target.files[0]);
  }

  const handleUpload = async (event:any) => {
    //const userInfo = useRecoilValue(userInfoState);
    //const [selectedFile, setSelectedFile] = useState(null)
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('pdf', selectedFile);
    
    console.log(formData);

    try {
      const data = {
        //User_ID: userInfo[0]['User_ID'],
        User_ID: 11,
        Sponsor_Org_ID: 11,
        Application_Document: formData
      }
      console.log(data)

      fetch('/api/sponsor_driver_relationship/create/addrelationship', {
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
        console.log("Error: ", error);
      });
    } catch (err) {
      console.log('error resending code: ', err);
    }
  }

  return ( 
    <>
    <h1>driver application upload</h1>
    <form onSubmit={handleUpload}>
      <div>
        <label htmlFor="pdf">Select a PDF to upload:</label>
        <input
          type="file"
          id="pdf"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit">Upload PDF</button>
    </form>
    </>
  );
}

//export default Upload;