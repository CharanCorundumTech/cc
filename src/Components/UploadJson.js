import React, { useState } from 'react';
import axios from 'axios';
import './UploadJson.css'
import apiConfig from '../env';

const UploadJson = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      console.log(selectedFile)
      formData.append('json', selectedFile);

      // Replace 'http://example.com/upload' with your backend endpoint
      const response = await axios.post(`${apiConfig.baseUrl}/jsonUpload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data)
      alert(`File Uploaded!`); // Handle response from the backend
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    
      <div style={{ height: '400px',display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"2rem", backgroundColor: '',border:"0px solid black", borderRadius: '5px', padding: '10px',boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
        <h4 style={{fontFamily:'Roboto',fontWeight:"500"}}>UPLOAD JSON DATA</h4>
        <div>
        <input type='file' onChange={handleFileChange}  style={{bodrder:"1px solid black",borderRadius:"10px",backgroundColor:"#fff2de",height:"200px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}/>
        <button onClick={handleSubmit} className='uploadjson_btn' >Upload</button>
        </div>
      </div>
    
  );
};

export default UploadJson;
