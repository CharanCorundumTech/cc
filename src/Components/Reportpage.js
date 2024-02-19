import React, { useState } from 'react'
import './Reportpage.css'
import demo from '../Assets/demo2.jpg'
import { useNavigate } from 'react-router-dom';
// const Reportpage = ({post_title,posted_by,source,source_link,detailed_report_link,people_identified}) => {
const Reportpage = (info) => {
  console.log(info)
  const navigate = useNavigate()

  // const CC= props.location.state.state.data || {};
  // console.log(source)
  // console.log(post_title)
 
const [isContentVisible, setIsContentVisible] = useState(false);
const toggleContent = () => {
  setIsContentVisible(!isContentVisible);
};

  return (
    <>
    <div style={{minHeight:"90vh", padding:"10px",backgroundColor:"#000032"}}>
      <button className='back_btn' onClick={()=>window.location.reload()}>Close</button>
      <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <h3 style={{color:"white"}}>Report </h3>

    <div style={{border:"1px solid black",backgroundColor:"white",padding:"20px",borderRadius:"10px",width:"700px"}}>
    <div style={{fontWeight:"500"}}>
      {/* <div style={{height:"200px",width:"300px",marginBottom:"10px",backgroundColor:"grey"}}>
      <iframe height="200" src={info.info.postLink} frameborder="0" allowfullscreen></iframe>
      </div> */}
      <p><b>POST TITLE : </b>{info.info.postContent}</p>
      <p><b>POSTED BY : </b>{info.info.postOwnerName}</p>
      <p><b>POST OWNER ID : </b>{info.info.postOwnerId}</p>
      <p><b>SOURCE : </b>{info.info.platform}</p>
      <p><b>SOURCE LINK : </b><a href={info.info.postLink} target="_blank" rel="noopener noreferrer">{info.info.postLink}</a></p>
      {/* <p><b><u>DETAILED REPORT</u></b><a href='http://127.0.0.1:3000/detailed_report'></a><button onClick={toggleContent} style={{border:"none",backgroundColor:"#16437e",color:"white",borderRadius:"5px",marginLeft:"10px"}}><b>{isContentVisible ? 'Hide' : 'Show'}</b></button></p> */}
      <p><b><u>DETAILED REPORT</u></b><button onClick={toggleContent} style={{border:"none",backgroundColor:"#16437e",color:"white",borderRadius:"5px",marginLeft:"10px"}}><b>{isContentVisible ? 'Hide' : 'Show'}</b></button></p>
      {isContentVisible && (
      <div style={{marginLeft:"20px",backgroundColor:"lightgrey",padding:"10px"}}>
      <p><b>FILE ID : </b>{info.info.postId}</p>
      <p><b>FOST OWNER NAME : </b>{info.info.postOwnerName}</p>
      <p><b>FILE TYPE : </b>{info.info.postType}</p>
      {/* <p><b>FILE PATH :</b>{path}</p> */}
      <p><b>UPLOAD TIME : </b>{info.info.dateTime}</p>
      {/* <p><b>IS SORTLISTED : </b>{formatted_date}</p> */}
      <p><b>IS SORTLISTED : </b>{info.info.isShortlisted ? "True":"False"}</p>
      <p><u><b>INTERACIONS : </b></u></p>
      <div style={{marginLeft:"20px"}}>
        {/* <p><b>VIOLENCE_AGAINST_HUMANS : </b>{Violence_Against_Humans ? 'True' : 'False'}</p> */}
      <p><b>COMMENTS : </b>{info.info.interactions.comments}</p>
      <p><b>LIKES :</b>{info.info.interactions.likes}</p>
      <p><b>REKOOS : </b>{info.info.interactions.rekoos}</p>
      <p><b>RETWEETS : </b>{info.info.interactions.retweets}</p>
      <p><b>SHARES : </b>{info.info.interactions.shares}</p>
      <p><b>VIEWS : </b>{info.info.interactions.views}</p>
      </div>
    
      {/* <p><b style={{color:"red"}}>TRANSCRIPTION : </b><span style={{color:"#052a44",fontWeight:"bold"}}>{transcription}</span></p> */}
      <p><b style={{color:"red"}}>TRANSCRIPTION : </b><span style={{color:"#052a44",fontWeight:"bold"}}>
      Not Available
        </span></p>
      </div>
      )}


    </div>
    <div style={{display:"flex",gap:"20px",fontWeight:"500"}}>
     <p><b>VIOLATIONS : </b> -</p>
     {/* <div style={{display:"flex",gap:"20px",marginBottom:"10px"}}> 
      <button className='report_btns'>PROFANITY</button>
      <button className='report_btns'>VIOLENCE</button>
      <button className='report_btns'>DEEP FAKE</button>
      </div> */}
    </div>
    <p ><b>RISK SCORE : -</b></p>
    
     <div style={{display:"flex",gap:"20px",marginLeft:"30PX",marginTop:"20px"}}> 
      <button className='report_btns2'>FLAG</button>
      <button className='report_btns2'>DISMISS</button>
      <button className='report_btns2'>EDIT BEFORE FLAGGING</button>
      </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default Reportpage