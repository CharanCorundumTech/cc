import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import './Reportpage.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewReportModal({openModal,info,handleShowReportFalse}) {

    console.log("Yahoo------------->",openModal)
    console.log(info)
  const [open, setOpen] = React.useState(openModal);

  const handleClickOpen = () => {
    // setOpen(openModal);
  };

  const handleClose = () => {
    handleShowReportFalse(false)
    setOpen(false);
    
  };

  const [isContentVisible, setIsContentVisible] = React.useState(false);
const toggleContent = () => {
  setIsContentVisible(!isContentVisible);
};



  return (
    <React.Fragment>
      {/* <Button variant="outlined" >
        Open full-screen dialog
      </Button> */}
    <button  className='card-btn' onClick={handleClickOpen}><b>View</b></button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'fixed', backgroundColor:'black' }}>
          <Toolbar>
            <button style={{borderRadius:'7px', color:'white', backgroundColor:'red', cursor:'pointer', fontWeight:'bold', fontSize:'large'}} onClick={handleClose}>Close</button>
            <Typography sx={{marginLeft:'2rem'}}>Post Details</Typography>
          </Toolbar>
        </AppBar>
        <div style={{marginTop:'5rem'}}>

        { info!==null && <>
          <h5 style={{color:"black",marginLeft:"2rem"}}><b>Post Details</b></h5>

        <div style={{margin:'2rem',width:"60%", border:'2px solid black', padding:'1rem', borderRadius:'7px'}}>
          
        <p ><b>POST TITLE:</b> {info.postContent}</p>
        <p ><b>SOURCE LINK:</b> <a href={info.postLink} target="_blank" rel="noopener noreferrer">{info.postLink}</a></p>
        <p><b>POST OWNER NAME:</b> {info.postOwnerName}</p>
      <p><b>FILE TYPE:</b> {info.postType}</p>
        </div>
        <p style={{margin:'2rem'}}><b><u>DETAILED REPORT</u></b><button onClick={toggleContent} style={{border:"none",backgroundColor:"#16437e",color:"white",borderRadius:"5px",marginLeft:"10px"}}><b>{isContentVisible ? 'Hide' : 'Show'}</b></button></p>
      {isContentVisible && (
           
        <div style={{ display: "grid",maxWidth:'95%', gridTemplsateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "10px", marginLeft: "3rem",width:"80%",marginBottom:"25px", backgroundColor: "#d3d3d3", padding: "10px" }}>
  
  <p><b>POSTED BY:</b> {info.postOwnerName}</p>
  <p><b>POST OWNER ID:</b> {info.postOwnerId}</p>
  <p ><b>POST OWNER LINK:</b> <a href={info.postLink} target="_blank" rel="noopener noreferrer">{info.postOwnerLink}</a></p>
  <p style={{wordWrap:'break-word'}}><b>SCREENSHOT LINK:</b> <a href={info.postLink} target="_blank" rel="noopener noreferrer">{info.screenshotLink}</a></p>


  <p><b>SOURCE:</b> {info.platform}</p>
  
  
  
    <>
      <p><b>FILE ID:</b> {info.postId}</p>
      <p><b>POST OWNER NAME:</b> {info.postOwnerName}</p>
      <p><b>FILE TYPE:</b> {info.postType}</p>
      <p><b>UPLOAD TIME:</b> {info.dateTime}</p>
      <p><b>IS SORTLISTED:</b> {info.isShortlisted ? "True" : "False"}</p>
      <p><b>CONTENT LANGUAGE:</b> {info.postContentLanguage[0]}</p>

      
      <div style={{flex:1, display:'flex', gap:'5px'}} >
        <p style={{color:"red"}}><b>INTERACTIONS:</b></p>
        <div style={{flex:0.5, display:'flex', flexDirection:'column',backgroundColor:"", justifyContent:'flex-start'}}>
        <p><b>COMMENTS:</b> {info.interactions.comments}</p>
        <p><b>LIKES:</b> {info.interactions.likes}</p>
        <p><b>REKOOS:</b> {info.interactions.rekoos}</p>
        <p><b>RETWEETS:</b> {info.interactions.retweets}</p>
        <p><b>SHARES:</b> {info.interactions.shares}</p>
        <p><b>VIEWS:</b> {info.interactions.views}</p>
        </div>
        
      </div>
      <p style={{ color: "red" }}><b>VIOLATIONS :</b> <span style={{ color: "#052a44", fontWeight: "bold" }}>{info.reason}</span></p>
      <p><b>SENTIMENT:</b> {info.sentiment.label}</p>
      <p><b>SENTIMENT SCORE:</b> {info.sentiment.score}</p>
      
    {info.tags.length > 0 ? (
    <>
      <p><b>TAGS:</b></p>
      <ul>
        {info.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </>
  ) : (
    <p><b>TAGS:</b> None</p>
  )}
  <div style={{width:"100%",backgroundColor:""}}>
      <p style={{ color: "red" }}><b>TRANSCRIPTION:</b> <span style={{ color: "#052a44", fontWeight: "bold" }}>{info.postContentTranslated}</span></p>
      </div>
    </>
</div>
      )}
      {/* <div style={{display:"flex",gap:"20px",marginLeft:"30PX",marginTop:"20px",marginBottom:"20px",backgroundColor:"",width:"50%"}}> 
      <button className='report_btns2'>FLAG</button>
      <button className='report_btns2'>DISMISS</button>
      <button className='report_btns2'>EDIT BEFORE FLAGGING</button>
      </div> */}
</>

}

</div>
      </Dialog>
    </React.Fragment>
  );
}