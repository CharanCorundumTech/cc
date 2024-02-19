import React, { useEffect, useState } from 'react'
import './Homepage.css'
import { useNavigate } from 'react-router-dom'
import { Button, Dialog, DialogActions } from '@mui/material'
import Graph from './Graph'
import Piechart from './Piechart'
import WidgetsIcon from '@mui/icons-material/Widgets';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import DatasetIcon from '@mui/icons-material/Dataset';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import Tiles from './Tiles'
import Navbar from './Navbar'
import axios from 'axios'
import UploadJson from './UploadJson'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import html2pdf from 'html2pdf.js';
import ViewReportModal from './ViewReportModal'
import FlagPage from './FlagPage'
import apiConfig from '../env'


const Homepage = () => {
  const navigate = useNavigate()
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [carddata, setCardData] = useState()
  const [searchData, setSearchData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [postid, setPostid] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    let num = 1
    axios.get(`${apiConfig.baseUrl}/getAllData?page=${num}`, {
      headers: {
        Authorization: token, // Make sure to replace 'Token' with the actual token value
      }
    })
      .then((response) => {
        console.log(response)
        setCardData(response.data)
        setShowreports(false)

      }).catch((error) => {
        console.log(error)

      })
  }, [])


  const [showTiles, setShowTiles] = useState(false)
  const [showgraphs, setShowgraphs] = useState(true)
  const [showReports, setShowreports] = useState(false)
  const [uploadjson, setUploadjson] = useState(false)
  const [showReport, setShowReport] = useState(false)

  const [appdata, setappData] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [info, setInfo] = useState('')
  const [open, setopen] = useState(false)
  const [searchCurrentPage, setSearchCurrentPage] = useState(1)
  const [searchNumPage, setSearchNumPage] = useState(1)

  // const [showreport,setShowReport]=useState(false)

  const handleShowReportFalse = (boolValue) => {
    setShowReport(boolValue);
  };

  const viewFunction = (index) => {
    setInfo(searchData[index])
    // console.log(carddata[index])
    setShowReport(true)
    setIsModalOpen(true)
  }

  const handleSearchChange = (keyword) => {
    setSearchKeyword(keyword);
  };

  const handleSearchStatusChange = (isActive) => {
    setIsSearchActive(isActive);
  };

  const handleCloseDialog = () => {
    setopen(false);
  };

  const viewDataFunction = () => {
    setShowTiles(true)
    setShowgraphs(false)
    setShowreports(false)
    setUploadjson(false)
    setShowflaged(false)
    setSearchData([])
    setCurrentPage(1)


  }
  const viewGraphFunction = () => {
    setShowgraphs(true)
    setUploadjson(false)

    setShowTiles(false)
    setShowreports(false)
    setShowflaged(false)
    setSearchData([])
    setCurrentPage(1)
  }
  const uploadjsonFunction = () => {
    setUploadjson(true)
    setShowTiles(false)
    setShowgraphs(false)

    setShowreports(false)
    setaStopdata(true)
    setShowflaged(false)
    setSearchData([])
    setCurrentPage(1)
  }

  const rejecteddata = (currentPage) => {
    setSearchData([])
    setSearchKeyword('')
    const token = localStorage.getItem('token')
    axios.get(`${apiConfig.baseUrl}/getAllRejectedData?page=${currentPage}`, {
      headers: {
        Authorization: token,
      }
    })
      .then((response) => {
        setappData(response.data)
      }).catch((error) => {
        console.log(error)
      })
  }
  const flagFunction = (index) => {
    setopen(true)
    setPostid(searchData[index].postId)
  }

  const [stopdata, setaStopdata] = useState(false)
  const viewReportFunction = () => {
    setShowreports(true)
    setShowflaged(false)

    setaStopdata(true)
    setUploadjson(false)

    setShowTiles(false)
    setShowgraphs(false)
    setCurrentPage(1)

    rejecteddata(currentPage)


  }


  const [showflaged, setShowflaged] = useState(false)
  const viewFlaggedFunction = () => {
    setSearchData([])
    setShowflaged(true)
    setShowreports(false)
    setaStopdata(true)
    setUploadjson(false)

    setShowTiles(false)
    setShowgraphs(false)
    setCurrentPage(1)

    approvedata(currentPage)

  }
  const approvedata = (currentPage) => {
    const token = localStorage.getItem('token')
    axios.get(`${apiConfig.baseUrl}/getAllApprovedData?page=${currentPage}`, {
      headers: {
        Authorization: token, // Make sure to replace 'Token' with the actual token value
      }
    })
      .then((response) => {
        setappData(response.data)
        // setShowreports(false)
      }).catch((error) => {


      })
  }
  const role = localStorage.getItem('role')

  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(1);

  const fetchData = async (page) => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(`${apiConfig.baseUrl}/getAllApprovedData?page=${page}`, {
        headers: {
          "Authorization": token,
        }
      });
      if (response.data.length === 0) {

      } else {
        setappData(response.data)
      }


      // setIsLoading(false)
      setCurrentPage(page);
      setNumPages(response.data.numPages);
    } catch (error) {
      console.log(error)
    }
  }
  console.log()
  useEffect(() => {
    fetchData(currentPage);
    approvedata(currentPage)
    rejecteddata(currentPage)
  }, [currentPage]);
  const downloadFunction = (index) => {

    const generatePDF = (newjson) => {
      const content = `
        <div style={{margin:"20px"}}>
          <h2>Suspicious Thread Record</h2>
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
      console.log(appdata[index])
      const json = appdata[index]
      const newjson = {
        // "_id":Object(json._id),
        "postId": json.postId,
        "dateTime": json.dateTime,
        "postContent": json.postContent,
        "platform": json.platform,
        "postLink": json.postLink,
        "postOwnerId": json.postOwnerId,
        "postOwnerLink": json.postOwnerLink,
        "postOwnerName": json.postOwnerName,
        "postOwnerType": json.postOwnerType,
        "postType": json.postType,
        "reason": json.reason,
        "screenshotLink": json.screenshotLink,
        "comments": json.interactions.comments,
        "likes": json.interactions.likes,
        "rekoos": json.interactions.rekoos,
        "retweets": json.interactions.retweets,
        "shares": json.interactions.shares,
        "views": json.interactions.views,
        "targetData": json.targetData,
        "targetId": json.targetId,
        "sentiment": json.sentiment.label,
        "isShortlisted": json.isShortlisted,
        "tags": json.tags,
      }
      generatePDF(newjson)

    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  }
  const [analyticsData, setAnalyticsData] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(`${apiConfig.baseUrl}/getAnalytics`, {
      headers: {
        "Authorization": token,
      }
    }).then((response) => {
      setAnalyticsData(response.data)
      console.log("Chekkkkkkkkkkkk->", response.data)
    }).catch((error) => {
      alert(error)
    })
  }, [])

  const searchFunction = (currrPage) => {
    if (searchKeyword !== '') {
      const token = localStorage.getItem('token')
      axios.get(`${apiConfig.baseUrl}/dataSearch?search=${searchKeyword}&page=${currrPage}`, {
        headers: {
          "Authorization": token,
        }
      }
      ).then((response) => {
        if (response.data.length > 0) {
          setSearchData(response.data)
          setSearchCurrentPage(currrPage);
          setSearchNumPage(undefined);
        } else {
          alert("No Data Exists")
        }
      })
    }
  }

  useEffect(() => {
    searchFunction(searchCurrentPage)
  }, [searchKeyword, isSearchActive, searchCurrentPage])

  console.log(searchData, searchData.length)
  return (
    <>
      {<>
        <Navbar onSearchChange={handleSearchChange}
          onSearchStatusChange={handleSearchStatusChange} />
        <div className='main_container'>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h4 style={{ marginLeft: "10px", color: 'Darkblue' }}></h4>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div>
              {/******** side bar starts ************/}
              <div className="sidebar" style={{
                display: 'flex', flexDirection: "column", gap: "0.5rem",
                borderRadius: '15px',
                marginLeft: '5px',
                backgroundColor: "white",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                height: "89vh", width: "250px",
                paddingTop: "0.5rem"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
                  <div style={{ display: 'flex', fontSize: '15px', padding: '0.7rem', justifyContent: 'center', alignItems: 'center', color: 'Darkblue', fontWeight: 'bold', fontFamily: 'Poppins' }}>DASHBOARD PANEL</div> <div style={{ color: 'darkblue', fontSize: 'small' }}><WidgetsIcon /></div>
                </div>
                <hr style={{ marginTop: "-0.5rem" }} />

                <div className='sidebar_links' onClick={viewGraphFunction} style={{ backgroundColor: showgraphs ? "#6367f0" : "white", color: showgraphs ? "white" : "black" }}> <GraphicEqIcon /> Analytics </div>

                <div className='sidebar_links' onClick={viewDataFunction} style={{ backgroundColor: showTiles ? "#6367f0" : "white", color: showTiles ? "white" : "black" }}> <DatasetIcon /> View Data </div>
                {
                  role === 'user' && <div className='sidebar_links' onClick={uploadjsonFunction} style={{ backgroundColor: uploadjson ? "#6367f0" : "white", color: uploadjson ? "white" : "black" }}> <DriveFolderUploadIcon /> Upload JSON Data </div>
                }
                {
                  role !== 'user' && <div className='sidebar_links' onClick={viewReportFunction} style={{ backgroundColor: showReports ? "#6367f0" : "white", color: showReports ? "white" : "black" }}> <FlagCircleIcon /> Rejected Reports </div>
                }
                {
                  role === 'user' && <div className='sidebar_links' onClick={viewFlaggedFunction} style={{ backgroundColor: showflaged ? "#6367f0" : "white", color: showflaged ? "white" : "black" }}> <FlagCircleIcon /> Flagged Reports </div>
                }
                {
                  role !== 'user' && <div className='sidebar_links' onClick={viewFlaggedFunction} style={{ backgroundColor: showflaged ? "#6367f0" : "white", color: showflaged ? "white" : "black" }}> <FlagCircleIcon /> Flagged Reports </div>
                }


              </div>
              {/*****************  Sidebarends  *************/}
            </div>

            {searchData.length === 0 ? (<>
              <div style={{ minWidth:'81%', marginRight: '0.2rem', borderRadius: "10px", display: 'flex', gap: "5rem", alignItems: "center", justifyContent: 'center', backgroundColor: "white", overflow: "hidden" }}>
                {
                  showgraphs &&
                  <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '7rem', width: "100%", height: 'auto', marginLeft: '1rem', borderRadius: '10px', display: 'flex', gap: '2rem' }}>
                      <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                        <Graph data={analyticsData} />
                      </div>
                      <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                        <Piechart data={analyticsData} />
                      </div>
                      <div style={{ display: 'grid', fontSize: '1rem', gridTemplateColumns: 'auto 1fr', gap: '5px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', padding: '2rem', fontFamily: 'Poppins', fontWeight: 'bold', }}>
                        <div>
                          <p>TOTAL:</p>
                          <p>COMPLETED:</p>
                          <p>PENDING:</p>
                          <p>REJECTED:</p>
                          <p>FLAGGED:</p>
                        </div>
                        <div>
                          <p style={{ color: 'grey' }}><span>{analyticsData.total}</span></p>
                          <p style={{ color: 'grey' }}><span>{analyticsData.completed}</span></p>
                          <p style={{ color: 'grey' }}><span>{analyticsData.pending}</span></p>
                          <p style={{ color: 'grey' }}><span>{analyticsData.rejected}</span></p>
                          <p style={{ color: 'grey' }}><span>{analyticsData.approved}</span></p>

                        </div>
                      </div>
                    </div>
                  </>
                }

                {
                  showgraphs === false && showTiles === false && role === 'user' && <div style={{ display: stopdata ? "none" : "" }}> <Tiles /> </div>
                }
                {
                  showTiles && role === 'user' && <div style={{ display: stopdata ? "" : "" }}> <Tiles /> </div>
                }
                {
                  showTiles && role === 'reportingManager' && <div> <Tiles /> </div>
                }
                {
                  uploadjson && <div> <UploadJson /> </div>
                }
                {/* {
                  showTiles && role === 'reviewingManager' && <div> <ReviewManager /> </div>
                }  */}
                {
                  showTiles && role === 'reviewingManager' && <div> <Tiles /> </div>
                }

                {/* {showTiles && role === 'approvingManager' && <div> <ApprovalManagerDashboard /> </div>} */}

                { showTiles && role === 'approvingManager' && <div> <Tiles /> </div> }

                {

                  (showReports || showflaged) && <div style={{ display: 'flex', flexDirection: 'column', height: '90vh', width: '100%' }}>
                    <div className='maindata_div' style={{ display: 'flex', width: "100%", overflowY: "scroll", justifyContent: 'center', alignItems: 'center', maxHeight: '80vh', borderBottom: '1px solid black', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
                      {

                        appdata.length === 0 ? (
                          <h2>No data available</h2>
                        ) : (
                          appdata.map((items, index) => (
                            <div>
                              <div className='cards' style={{ minHeight: '60vh', display: "flex", justifyContent: "space-between", width: "380px" }} id={index}>
                                <div style={{ fontWeight: "500" }}><b>POST : </b>{items['postContent'].length > 30 ? items['postContent'].substring(0, 26) + '...' : items['postContent']}</div>
                                <div style={{ fontWeight: "500" }}><b>SOURCE : </b>{items.platform}</div>
                                <div style={{ fontWeight: "500" }}><b>USER HANDLE: </b>{items.postOwnerName.length > 30 ? items['postOwnerName'].substring(0, 24) + '...' : items['postOwnerName']}</div>
                                <div style={{ fontWeight: "500" }}><b>CONTAINS VIDEO : </b>{items.ContainsVideo}</div>
                                <div style={{ fontWeight: "500" }}><b>VIOLATIONS : </b>{items.reason.length > 30 ? items['reason'].substring(0, 24) + '...' : items['reason']}</div>
                                <div style={{ fontWeight: "500" }}><b>RISK SCORE : </b>{items.sentiment.score}</div>
                                <div style={{ fontWeight: "500" }}><b>Reason for Flag :</b>
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
                                <hr style={{ width: '100%', borderTop: '1px solid black', margin: 0 }}></hr>
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', gap: '0.5rem' }}>

                                  <div>
                                    {
                                      (role === 'approvingManager' && showflaged) && <button className='card_btns_flag' style={{}} onClick={() => { downloadFunction(index) }}><b>Download STR PDF</b></button>
                                    }
                                  </div>
                                  <b style={{ color: "green" }}>Status</b>
                                  {items.Status === 1 && <p style={{ fontSize: '14px', color: 'white', backgroundColor: '#840c10', padding: '0.3rem', borderRadius: '6px', fontWeight: 'bold' }}>FLAGGED BY USER</p>}
                                  {items.Status === 2 && <p style={{ fontSize: '14px', color: 'white', backgroundColor: '#840c10', padding: '0.3rem', borderRadius: '6px', fontWeight: 'bold' }} >FLAGGED BY REPORTING MANAGER</p>}
                                  {items.Status === 3 && <p style={{ fontSize: '14px', color: 'white', backgroundColor: '#840c10', padding: '0.3rem', borderRadius: '6px', fontWeight: 'bold' }}>FLAGGED BY REVIEWING MANAGER</p>}
                                  {items.Status === 4 && <p style={{ fontSize: '14px', color: 'white', backgroundColor: '#840c10', padding: '0.3rem', borderRadius: '6px', fontWeight: 'bold' }}>FLAGGED BY APPROVING MANAGER</p>}
                                  {items.Status === -2 && <p style={{ fontSize: '14px', color: 'white', backgroundColor: '#cb6300', padding: '0.3rem', borderRadius: '6px', fontWeight: 'bold' }}>REJECTED BY REPORTING MANAGER</p>}
                                  {items.Status === -3 && <p style={{ fontSize: '14px', color: 'white', backgroundColor: '#cb6300', padding: '0.3rem', borderRadius: '6px', fontWeight: 'bold' }}>REJECTED BY REVIEWING MANAGER</p>}
                                  {items.Status === -4 && <p style={{ fontSize: '14px', color: 'white', backgroundColor: '#cb6300', padding: '0.3rem', borderRadius: '6px', fontWeight: 'bold' }}>REJECTED BY APPROVING MANAGER</p>}

                                </div>
                              </div>
                            </div>))
                        )}
                    </div>
                    <div style={{ display: 'flex', width: "100%", justifyContent: 'center', marginTop: '1rem' }}>
                      <Button
                        style={{ backgroundColor: currentPage===1 ?"#e0e0e0": "#1976d2", color: "white", height: "20px", borderRadius: "20px", display: "flex", alignItems: "center" }}
                        variant="contained"
                        disabled={currentPage === 1}
                        onClick={() => fetchData(currentPage - 1)}
                      >
                        Prev
                      </Button>
                      <p style={{ paddingLeft: "5px", paddingRight: "5px" }}><b>{currentPage}</b></p>
                      <Button
                        style={{ backgroundColor: appdata.length === 0 ?"#e0e0e0": "#1976d2",color: "white", height: "20px", borderRadius: "20px", display: "flex", alignItems: "center" }}
                        variant="contained"
                        // style={{ marginLeft: '1rem' }}
                        disabled={appdata.length === 0}
                        onClick={() => fetchData(currentPage + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                }
              </div>


            </>) : (
              <div style={{minWidth:'82%', backgroundColor: 'white', display: 'flex',justifyContent:'space-between',  flexDirection: 'column',minHeight:'80vh' }}>
                {
                  showReport && <ViewReportModal handleShowReportFalse={handleShowReportFalse} openModal={isModalOpen} info={info} />
                }
                <div style={{minWidth:'100%', minHeight: '80vh',maxHeight:'80vh', overflowY: 'scroll', minWidth: '100%', display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
                  {searchData.map((items, index) => (
                    <div className='cards' style={{maxHeight:'60vh'}} id={index}>
                      <div style={{ fontWeight: "500" }}><b>POST : </b>{items['postContent'].length > 30 ? items['postContent'].substring(0, 26) + '...' : items['postContent']}</div>
                      <div style={{ fontWeight: "500" }}><b>SOURCE : </b>{items.platform}</div>
                      <div style={{ fontWeight: "500" }}><b>USRER HANDLE : </b>{items.postOwnerName.length > 30 ? items['postOwnerName'].substring(0, 14) + '...' : items['postOwnerName']}</div >
                      <div style={{ fontWeight: "500" }}><b>CONTAINS VIDEO : </b>{items.ContainsVideo}</div>
                      {/* <div style={{ fontWeight: "500" }}><b>VIOLATIONS : </b>{items.reason.length > 30 ? items['reason'].substring(0, 14) + '...' : items['reason']}</div > */}
                      <div style={{ fontWeight: "500" }}><b>RISK SCORE : </b>{items.sentiment.score}</div >
                      <hr style={{ width: '100%', borderTop: '1px solid black', margin: 0 }} />
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "1.3rem", padding: '0.7rem', alignItems: 'center' }}>
                        <button className='card-btn'><b><a style={{ textDecoration: 'none', color: 'white' }} id='hyperlink' href={items.postLink} target="_blank" rel="noopener noreferrer">Link </a></b></button>
                        <button className='card-btn' onClick={() => viewFunction(index)}><b>View</b></button>
                        <button className='flag-btn' onClick={() => { flagFunction(index) }}><b>Flag For Investigation</b></button>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.3rem', minWidth:'100%' }}>
                  <Button
                    style={{ backgroundColor: "#1976d2", color: "white", height: "20px", borderRadius: "20px", display: "flex", alignItems: "center" }}
                    variant="contained"
                    disabled={searchCurrentPage === 1}
                    onClick={() => searchFunction(searchCurrentPage - 1)}
                  >
                    Previous
                  </Button>
                  <p style={{ paddingLeft: "5px", paddingRight: "5px" }}><b>{searchCurrentPage}</b></p>
                  <Button
                    style={{ backgroundColor: "#1976d2", height: "20px", borderRadius: "20px", display: "flex", alignItems: "center" }}
                    variant="contained"
                    disabled={searchCurrentPage === searchNumPage}
                    onClick={() => searchFunction(searchCurrentPage + 1)}
                  >
                    Next Page
                  </Button>
                </div>
              </div>
            )
            }
          </div>
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
      </>
      }
    </>
  )
}

export default Homepage
