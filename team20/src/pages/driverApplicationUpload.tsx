import React, { useState } from "react";

const UploadPdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event: any) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    const response = await fetch(
      "/api/sponsor_driver_relationship/create/addrelationship",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      console.log("PDF uploaded successfully");
    } else {
      console.error("Failed to upload PDF");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <div>
        <label htmlFor="pdf">Select a PDF to upload:</label>
        <input type="file" id="pdf" accept=".pdf" onChange={handleFileChange} />
      </div>
      <button type="submit">Upload PDF</button>
    </form>
  );
};

export default UploadPdf;
