import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, CircularProgress, Dialog, DialogActions } from '@mui/material'
import Reportpage from './Reportpage'
import FlagPage from './FlagPage'
import axios from 'axios'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import html2pdf from 'html2pdf.js';
import apiConfig from '../env'


const ApprovalManagerDashboard = () => {
    const navigate = useNavigate()

    const [showReport,setShowReport]=useState(false)
  const [source,setSource]=useState('')
  const [post_title,setPost_title]=useState('')
  const [user_handle,setUser_handle]=useState('')
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [dashboardData,setDashboardData]=useState('')
  const [carddata,setCardData]=useState([])
  const [info,setInfo]=useState('')




  const viewFunction =(index)=>{
    setInfo(carddata[index])
    
    setShowReport(true)
    

  }
  const handleCloseDialog = () => {
    setopen(false);
    // setMessageIndex(0);
  };
  const [open,setopen]=useState(false)
  const [postid,setPostid]=useState('')
  const flagFunction = (index)=>{
    setopen(true)
    setPostid(carddata[index].postId)
    console.log(carddata[index].postId)

  }

  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const fetchData = async (page) => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(`${apiConfig.baseUrl}/getAllData?page=${page}`, {
        headers: {
          "Authorization": token,
        }
      });
      setCardData(response.data)
      setIsLoading(false)
      setCurrentPage(page);
      setNumPages(response.data.numPages);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

if (isLoading) {
  return (
    <div className='loader-container' style={{ marginTop: "0rem",display:'flex',justifyContent:"center",alignItems:"center",height:"300px",width:"80rem",backgroundColor:"" }}>
      <h3 style={{ marginTop: "0rem" }}>Loading....</h3> <CircularProgress />
    </div>
  );
}

if (carddata.length === 0) {
  return (
    <div>
    <div className='loader-container' style={{ marginTop: "0rem",display:'flex',justifyContent:"center",alignItems:"center",height:"300px",width:"80rem",backgroundColor:"" }}>

      <h3 style={{ marginTop: "5rem" }}>No data to show</h3>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.3rem' }}>
      
      <Button
        style={{backgroundColor:"lightblue",color:"white",height:"20px",borderRadius:"20px",display:"flex",alignItems:"center"}}
        variant="contained"
        disabled={currentPage === -1}
        onClick={() => fetchData(currentPage - 1)}
      >
        Previous
      </Button>
      <p style={{paddingLeft:"5px",paddingRight:"5px"}}><b>{currentPage}</b></p>
      <Button
        style={{backgroundColor:"lightblue",height:"20px",borderRadius:"20px",display:"flex",alignItems:"center"}}
        variant="contained"
        // style={{ marginLeft: '1rem' }}
        disabled={currentPage === numPages}
        onClick={() => fetchData(currentPage)}
      >
        Next Page
      </Button>
    </div>
    </div>
    
  );
}
const downloadFunction =(index)=>{

  const generatePDF = (newjson) => {
    const content = `
      <div style={{margin:"20px"}}>
        <h2>Detailed Report</h2>
        <div style={{margin:"10px"}}>
          <table border="1">
            <tbody>
              ${Object.entries(newjson)
                .map(([key, value]) => `
                  <tr>
                    <td><b>${key}</b></td>
                    <td>${value}</td>
                  </tr>
                `)
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  
    html2pdf(content, {
      filename: 'report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    });
  };




    const token = localStorage.getItem('token')
    try {
      console.log(carddata[index])
      const json=carddata[index]
      const newjson={
        "_id":json._id,
        "dateTime":json.dateTime,
        "postContent":json.postContent,
        "platform":json.platform,
        "postId":json.postId,
        "postLink":json.postLink,
        "postOwnerId":json.postOwnerId,
        "postOwnerLink":json.postOwnerLink,
        "postOwnerName":json.postOwnerName,
        "postOwnerType":json.postOwnerType,
        "postType":json.postType,
        "reason":json.reason,
        "screenshotLink":json.screenshotLink,
        "comments":json.interactions.comments,
        "likes":json.interactions.likes,
        "rekoos":json.interactions.rekoos,
        "retweets":json.interactions.retweets,
        "shares":json.interactions.shares,
        "views":json.interactions.views,
        "targetData":json.targetData,
        "targetId":json.targetId,
        "sentiment":json.sentiment.label,
        "isShortlisted":json.isShortlisted,
        "tags":json.tags,
      }
      generatePDF(newjson)
    //   const formattedJson = JSON.stringify(json, null, 4);
    //   console.log(formattedJson)

    // // Create a new jsPDF instance
    // const doc = new jsPDF();
    // doc.text(20, 20, formattedJson);

    // // Save the PDF
    // doc.save("output.pdf");
  
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
 

}


const role=localStorage.getItem('role')
console.log(role)
  return (
    <>
    
    <div className='hidescrollbars' style={{backgroundColor:"",marginTop:"2rem",borderRadius:"10px",paddingBottom:"1rem",height:"650px",overflow:"scroll"}}>
        {
showReport && <Reportpage info={info} />
        }
        {/* <div style={{backgroundColor:"#000032"}}>
        <Button id='close_btn' style={{marginTop:"1rem",marginLeft:"1rem",backgroundColor:"white",color:"black"}}  onClick={()=>{navigate('/')}}>
      Back
    </Button>
        </div> */}

        <div className='maindata_div' style={{backgroundColor:"",width:"78.2rem"}}>
      {
        !showReport && 
        carddata.map((items,index)=>(
          <>
          <div className='cards_appmngr' id={index}>
            <p style={{fontWeight:"500"}}><b>POST : </b>{items['postContent'].length > 30 ? items['postContent'].substring(0, 26) + '...' : items['postContent']}</p>
            <p style={{fontWeight:"500"}}><b>SOURCE : </b>{items.platform}</p>
            <p style={{fontWeight:"500"}}><b>USRER HANDLE : </b>{items.postOwnerName.length > 30 ? items['postOwnerName'].substring(0, 24) + '...' : items['postOwnerName']}</p>
            <p style={{fontWeight:"500"}}><b>CONTAINS VIDEO : </b>{items.ContainsVideo}</p>
            <p style={{fontWeight:"500"}}><b>VIOLATIONS : </b>{items.reason}</p>
            <p style={{fontWeight:"500"}}><b>RISK SCORE : </b>{items.sentiment.score}</p>
            <div style={{display:"flex",justifyContent:"space-between",gap:"10px",marginRight:"20px"}}>
            <button className='upload_btn'><b><a id='hyperlink' href={items.postLink} target="_blank" rel="noopener noreferrer"> Source Link</a></b></button>
            <button className='card_btns' onClick={() => viewFunction(index)}><b>View</b></button>
            <button className='card_btns_flag' onClick={()=>{flagFunction(index)}}><b>Flag For Investigation</b></button>
            </div>


          </div>
          </>

          ))
      }
          <Dialog open={open} onClose={handleCloseDialog}
      fullWidth
      maxWidth="xl"  // Adjust the width here
       PaperProps={{
         style: {
            width:'40%',
          height: '80%',
           display:"flex",
           justifyContent:"center",alignItems:"center"
          //  backgroundColor:"#000032"  
            
         },
       }}>
        <div style={{height:"100%",width:"100%",backgroundColor:"#eae8dc",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
        <DialogActions style={{backgroundColor:"#000032"}}>
    <Button id='close_btn'  onClick={handleCloseDialog} >
      Close
    </Button>
  </DialogActions>
          <FlagPage id={postid} />
 
  </div>

</Dialog>
      

    </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.3rem' }}>
      
      <Button
        style={{backgroundColor:"lightblue",color:"white",height:"20px",borderRadius:"20px",display:"flex",alignItems:"center"}}
        variant="contained"
        disabled={currentPage === 1}
        onClick={() => fetchData(currentPage - 1)}
      >
        Previous
      </Button>
      <p style={{paddingLeft:"5px",paddingRight:"5px"}}><b>{currentPage}</b></p>
      <Button
        style={{backgroundColor:"lightblue",height:"20px",borderRadius:"20px",display:"flex",alignItems:"center"}}
        variant="contained"
        // style={{ marginLeft: '1rem' }}
        disabled={currentPage === numPages}
        onClick={() => fetchData(currentPage + 1)}
      >
        Next Page
      </Button>
    </div>
    </>
  )
}


export default ApprovalManagerDashboard