import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, CircularProgress, Dialog, DialogActions } from '@mui/material'
import Reportpage from './Reportpage'
import FlagPage from './FlagPage'
import axios from 'axios'
import apiConfig from '../env'

const ReportingManagerDashboard = () => {
    const navigate = useNavigate()
    const [showReport,setShowReport]=useState(false)
  const [source,setSource]=useState('')
  const [post_title,setPost_title]=useState('')
  const [user_handle,setUser_handle]=useState('')
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [dashboardData,setDashboardData]=useState('')
  const [carddata,setCardData]=useState([])
  const [num,setNum]=useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [info,setInfo]=useState('')



  const viewFunction =(index)=>{
    setInfo(carddata[index])
    console.log(carddata[index])

    
    setShowReport(true)
    // setSource(dummydata[index].source)
    // // setPost_title(dummydata[index].post)
    // setPost_title(dummydata[index].post)
    // setUser_handle(dummydata[index].user_handle)
    // navigate('/reportpage')
    // console.log(items)
    // console.log({ state: { data: items } })
    // navigate('/reportpage')
    // const dataToSend = JSON.stringify(data); 
    // console.log(dataToSend)
    // navigate('/reportpage', { state: { data: items } });
  //  <Reportpage />

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

const fetchData = async (page) => {
    const token = localStorage.getItem('token')
    try {
        
      const response = await axios.get(`${apiConfig.baseUrl}/getAllData?page=${page}`, {
        headers: {
          "Authorization": token,
        }
      });
      console.log(response.data)
      setCardData(response.data)
      setIsLoading(false)
      setCurrentPage(page);
      setNumPages(response.data.numPages);
    

    } catch (error) {
      console.log(error)
    }
  
  }
  const [appdata,setappData]=useState([])
  const fetchappdata = async (page) => {
  const token = localStorage.getItem('token')
    axios.get(`${apiConfig.baseUrl}/getAllRejectedData?page=${page}`, {
      headers: {
        Authorization: token, // Make sure to replace 'Token' with the actual token value
      }
    })
    .then((response)=>{
      if(response.data.length===0){
        alert("No Data Exists 1")
      } else{
        setappData(response.data)
      }
      
    // setShowreports(false)

    }).catch((error)=>{
      console.log(error)

    })
  }
  useEffect(() => {
    fetchData(currentPage);
    fetchappdata(currentPage)
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
    // <div>
    <div className='loader-container' style={{ marginTop: "0rem",display:'flex',justifyContent:"center",alignItems:"center",height:"300px",width:"80rem",backgroundColor:"" }}>

      <h3 style={{ marginTop: "5rem" }}>No data to show</h3>
    </div>
  );
}

  return (
    <>
    <div className='hidescrollbars' style={{display:'flex',justifyContent:'center', alignItems:'center', backgroundColor:"",minWidth:'100%', marginTop:"2rem",borderRadius:"10px",paddingBottom:"1rem",minHeight:'80vh',overflow:"scroll"}}>
        {
showReport && <Reportpage info={info} />
        }
        

        <div className='maindata_div' style={{display:'flex',justifyContent:'center', alignItems:'center',backgroundColor:"",minWidth:'100%', minWidth:'80vh'}}>
      {
        !showReport && 
        carddata.map((items,index)=>(
          <>
          <div className='cards' id={index}>
            <p>Hello</p>
            <p style={{fontWeight:"500"}}><b>POST : </b>{items['postContent'].length > 30 ? items['postContent'].substring(0, 20) + '...' : items['postContent']}</p>
            <p style={{fontWeight:"500"}}><b>SOURCE : </b>{items.platform}</p>
            <p style={{fontWeight:"500"}}><b>USRER HANDLE : </b>{items.postOwnerName.length > 30 ? items['postOwnerName'].substring(0, 24) + '...' : items['postOwnerName']}</p>
            <p style={{fontWeight:"500"}}><b>CONTAINS VIDEO : </b>{items.ContainsVideo}</p>
            <p style={{fontWeight:"500"}}><b>VIOLATIONS : </b>{items.Violations}</p>
            <p style={{fontWeight:"500"}}><b>RISK SCORE : </b>{items.sentiment.score}</p>
            <p style={{fontWeight:"500"}}><b>COMMENTS : </b>
            {items.comments.map((items,index)=>(
              <>
              <div style={{display:"flex",flexDirection:"",width:"100%",backgroundColor:"",}}>
                <div style={{marginLeft:"1.5rem"}}>  {items.user1}
                {items.rep}
                {items.rev}</div>
              </div>
              </>

            ))}</p>

            <div style={{display:"flex",justifyContent:"space-between",gap:"10px",marginRight:"20px"}}>

            <button className='upload_btn'><b><a id='hyperlink' href={items.postLink} target="_blank" rel="noopener noreferrer"> Source Link</a></b></button>
            <button className='card_btns' onClick={() => viewFunction(index)}><b>View</b></button>
            <button className='card_btns_flag' onClick={()=>{flagFunction(index)}}><b>Flag For Investigation</b></button>
            </div>

          </div>
          </>

          ))
      }


{
  showReport &&
        appdata.map((items,index)=>(
          <>
          <div className='cards' style={{minHeight:'50vh'}} id={index}>
            <p style={{fontWeight:"500"}}><b>POST : </b>{items['postContent'].length > 30 ? items['postContent'].substring(0, 26) + '...' : items['postContent']}</p>
            
            <p style={{fontWeight:"500"}}><b>SOURCE : </b>{items.platform}</p>
            <p style={{fontWeight:"500"}}><b>USRER HANDLE : </b>{items.postOwnerName}</p>
            <p style={{fontWeight:"500"}}><b>CONTAINS VIDEO : </b>{items.ContainsVideo}</p>
            <p style={{fontWeight:"500"}}><b>VIOLATIONS : </b>{items.reason}</p>
            <p style={{fontWeight:"500"}}><b>RISK SCORE : </b>{items.sentiment.score}</p>
            <p style={{fontWeight:"500"}}><b>COMMENTS : </b>
            {items.comments.map((items,index)=>(
              <>
              <div style={{display:"flex",flexDirection:"",width:"100%",backgroundColor:"",}}>
                <div style={{marginLeft:"1.5rem"}}>{items.user1}
                {items.rep}
                {items.rev}</div>
              </div>
              </>

            ))}</p>
            
            <div style={{display:"flex",justifyContent:"space-between",gap:"10px",marginRight:"20px"}}>
      {/* <p><b>SOURCE LINK : </b><a href='https://www.youtube.com/watch?v=JWIFhZsPsRw&pp=ygUdbmFyZW5kcmEgbW9kaSBsb2tzYWJoYSBzcGVlY2g%3D'> Post</a></p> */}
            <div style={{display:'flex', flexDirection:'column', gap:'0.4rem'}}>
              <div>
              <button style={{textAlign:'left'}} className='upload_btn'><b><a id='hyperlink' href={items.postLink} target="_blank" rel="noopener noreferrer"> Source Link</a></b></button>

              </div>
            { items.Status===1 && <p style={{backgroundColor:'red',padding:'0.3rem', borderRadius:'6px', fontWeight:'bold'}}>FLAGGED BY USER</p>}
            { items.Status===2 && <p style={{backgroundColor:'red',padding:'0.3rem',borderRadius:'6px',fontWeight:'bold'}} >FLAGGED BY REPORTING MANAGER</p>}
            { items.Status===3 && <p style={{backgroundColor:'red',padding:'0.3rem',borderRadius:'6px',fontWeight:'bold'}}>FLAGGED BY REVIEWING MANAGER</p>}
            { items.Status===4 && <p style={{backgroundColor:'red',padding:'0.3rem',borderRadius:'6px',fontWeight:'bold'}}>FLAGGED BY APPROVAL MANAGER</p>}
            { items.Status===-2 && <p style={{backgroundColor:'orange',padding:'0.3rem',borderRadius:'6px',fontWeight:'bold'}}>REJECTED BY REPORTING MANAGER</p>}
            { items.Status===-3 && <p style={{backgroundColor:'orange',padding:'0.3rem',borderRadius:'6px',fontWeight:'bold'}}>REJECTED BY REVIEWING MANAGER</p>}
            { items.Status===-4 && <p style={{backgroundColor:'orange',padding:'0.3rem',borderRadius:'6px',fontWeight:'bold'}}>REJECTED BY APPROVING MANAGER</p>}
            </div>
            </div>
          </div>
          </>
          ))
        }
      <Dialog open={open} onClose={handleCloseDialog}
      fullWidth
      maxWidth="xl"  
       PaperProps={{
         style: {
          width:'40%',
          height: '80%',
           display:"flex",
           justifyContent:"center",alignItems:"center"  
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
    {
      carddata.length >0 &&

    <div style={{ display: 'flex', justifyContent: 'center',backgroundColor:"pink", marginTop: '0.3rem',position:"sticky" }}>
      
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
    }

   </>
  )
}

export default ReportingManagerDashboard