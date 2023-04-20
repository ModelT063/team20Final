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
function Upload() {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event:any) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleUpload = async (event:any) => {
    const userInfo = useRecoilValue(userInfoState);
    const [selectedFile, setSelectedFile] = useState(null)
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    const data = {
      User_ID: userInfo[0]['User_ID'],
      Sponsor_Org_ID: 11,
      Application_Document: formData
    }

    const response = await fetch('/api/sponsor_driver_relationship/create/addrelationship', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('PDF uploaded successfully');
    } else {
      console.error('Failed to upload PDF');
    }
  }

  return (
    <>
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

export default Upload;