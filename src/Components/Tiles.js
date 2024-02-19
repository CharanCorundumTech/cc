import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, CircularProgress, Dialog, DialogActions } from '@mui/material'
import Reportpage from './Reportpage'
import FlagPage from './FlagPage'
import axios from 'axios'
import ViewReportModal from './ViewReportModal'
import apiConfig from '../env'

const Tiles = () => {
  const navigate = useNavigate()
  const [showReport, setShowReport] = useState(false)
  const [source, setSource] = useState('')
  const [post_title, setPost_title] = useState('')
  const [user_handle, setUser_handle] = useState('')
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [isModalOpen,setIsModalOpen]=React.useState(false)
  const [info, setInfo] = useState('')

  const handleShowReportFalse = (boolValue) => {
    setShowReport(boolValue);
  };

  const viewFunction = (index) => {
    setInfo(carddata[index])
    console.log(carddata[index])
    setShowReport(true)
    setIsModalOpen(true)
  }
  const handleCloseDialog = () => {
    setopen(false);

  };
  const [open, setopen] = useState(false)
  const [postid, setPostid] = useState('')
  const flagFunction = (index) => {
    setopen(true)
    setPostid(carddata[index].postId)
    console.log(carddata[index].postId)

  }

  const [carddata, setCardData] = useState([])
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(1);

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
      <div className='loader-container' style={{ marginTop: "0rem", display: 'flex', justifyContent: "center", alignItems: "center", height: "300px", width: "80rem", backgroundColor: "" }}>
        <h3 style={{ marginTop: "0rem" }}>Loading....</h3> <CircularProgress />
      </div>
    );
  }

  // if (carddata.length === 0) {
  //   return (
  //     <div>
  //       <h3 style={{}}>No Data To Show</h3>
  //     </div>
  //   );
  // }
  const role=localStorage.getItem('role')
console.log(carddata)
  return (
    <div style={{minWidth:"1300px", height:'90vh', display:'flex',flexWrap:"wrap",backgroundColor:"", flexDirection:'column' }}>

      <div className='hidescrollbars' style={{ width:'100%', borderRadius: "10px",padding:"20px",display:'flex',flexWrap:'wrap',gap:'1rem',justifyContent:'center',alignItems:'center' , paddingBottom: "1rem", height: "80vh", overflowY: "scroll", borderBottom:'2px solid black', borderTop:'2px solid black' }}>
        {
          showReport && <ViewReportModal handleShowReportFalse={handleShowReportFalse} openModal={isModalOpen} info={info} />
        }

          {
            !showReport &&
            carddata.length === 0 ? ( <h2>No data available</h2> ):(
            carddata.map((items, index) => (
              
                <div className='cards' id={index}>
                  <div style={{ fontWeight: "500" }}><b>POST : </b>{items['postContent'].length > 30 ? items['postContent'].substring(0, 26) + '...' : items['postContent']}</div>
                  <div style={{ fontWeight: "500" }}><b>SOURCE : </b>{items.platform}</div>
                  <div  style={{ fontWeight: "500" }}><b>USRER HANDLE : </b>{items.postOwnerName.length > 30 ? items['postOwnerName'].substring(0, 24) + '...' : items['postOwnerName']}</div >
                  <div  style={{ fontWeight: "500" }}><b>CONTAINS VIDEO : </b>{items.ContainsVideo}</div>
                  <div  style={{ fontWeight: "500" }}><b>IS SORTLISTED : </b>{items.isShortlisted ? "True":"False"}</div >
                  {
                   role !=='user' &&  <div  style={{ fontWeight: "500" }}><b>VOILATION : </b>{items.reason.length > 30 ? items['reason'].substring(0, 30) + '...' : items['reason']}</div >
                  }
                  <div  style={{ fontWeight: "500" }}><b>RISK SCORE : </b>{items.sentiment.score}</div >
                  {
                    role !=="user" &&
                  <div style={{ fontWeight: "500"}}><b style={{color:"red"}}>Reason for Flag :</b>
                                  <div style={{ maxHeight: '15vh', minHeight: '15vh', overflowY: 'scroll', border: '1px solid black', minWidth: '300px', borderRadius: '6px', padding: '0.3rem', fontSize: '12px' }}>{items.user1}
                                    {
                                      items.comments.map((comment, index) => (
                                        <div key={index} style={{ display: 'flex', flexDirection: 'column', wordWrap: 'break-all', overflowWrap: 'break-word' }}>
                                          {Object.entries(comment).map(([key, value], i) => (
                                            <React.Fragment key={i}>
                                              <span style={{ display: 'block', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                                <b>{key}:</b> {value}
                                              </span>

                                            </React.Fragment>
                                          ))}
                                          <hr />
                                        </div>
                                      ))
                                    }
                                  </div>
                                </div>
                        }
                  <hr style={{ width: '100%', borderTop: '1px solid black', margin:0 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1.3rem",  padding:'0.7rem', alignItems:'center' }}>
                    <button  className='card-btn'><b><a style={{textDecoration:'none', color:'white'}} id='hyperlink' href={items.postLink} target="_blank" rel="noopener noreferrer">Link </a></b></button>
                    <button  className='card-btn' onClick={() => viewFunction(index)}><b>View</b></button>
                    <button className='flag-btn' onClick={() => { flagFunction(index) }}><b>Flag For Investigation</b></button>
                  </div>
                </div>
            ))
            )
          }
          <Dialog open={open} onClose={handleCloseDialog}
            fullWidth
            maxWidth="xl" 
            PaperProps={{
              style: {
                width: '40%',
                height: '80%',
                display: "flex",
                justifyContent: "center", alignItems: "center"
              },
            }}>
            <div style={{ height: "100%", width: "100%", backgroundColor: "#eae8dc", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
              <DialogActions style={{ backgroundColor: "#000032" }}>
                <Button id='close_btn' onClick={handleCloseDialog} >
                  Close
                </Button>
              </DialogActions>
              <FlagPage id={postid} />
            </div>
          </Dialog>
        
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center', padding:'0.3rem' }}>

        <Button
          style={{ backgroundColor: currentPage===1 ?"#e0e0e0": "#1976d2", color: "white", height: "20px", borderRadius: "20px", display: "flex", alignItems: "center" }}
          variant="contained"
          disabled={currentPage === 1}
          onClick={() => fetchData(currentPage - 1)}
        >
          Prev
        </Button>
        <div style={{ paddingLeft: "5px", paddingRight: "5px", fontWeight:'bold' }}>{currentPage}</div>
        <Button
          style={{ backgroundColor: carddata.length === 0 ? "#e0e0e0": "#1976d2", color: "white", height: "20px",   borderRadius: "20px", display: "flex", alignItems: "center" }}
          variant="contained"
          disabled={carddata.length === 0}
          onClick={() => fetchData(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Tiles