import axios from "axios";
import React, { useRef, useState } from "react";
// import backgroundImage from "../HomePage/Main/MainBG.png";
// import mrs_logo from '../HomePage/Main/mrs_logo.png';
// import logo_img from '../../Assets/logo.png';
import './Reset_pass.css';
import { useNavigate } from "react-router-dom";
// import { Alarm } from "@mui/icons-material";
// import { Alarm } from "@mui/icons-material";

const Main_divStyle = {
  // backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const Reset_pass = () => {
  const navigate=useNavigate();
  const emailRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [visible_criteria, setVisible_criteria] = useState(false);
  // const [email_visible_criteria, setEmail_visible_criteria] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

   
    const email = emailRef.current.value;
    const isValid_email=validateEmail(email)
    // console.log(isValid_email)

    if(emailRef.current.value===""){
      setVisible_criteria(true);


    }else{
      // console.log(validateEmail)
      if(isValid_email){
        // alert("hiiii")
        // setEmail_visible_criteria(true)
        setLoading(true); // Set loading to true on button click
    
        axios
          .post("http://192.168.145.72:8000/resetPassLinkGen", { email })
          .then(function (response) {
            setLoading(false); // Reset loading to false after successful response
            // alert("Password Reset Link Sent to Registered Mail ID ");
            navigate('/reset_instructions')

            // console.log(response);
          })
          .catch(function (error) {
            setLoading(false); // Reset loading to false on error as well
            if(error.response.status===404){
              alert("There is no User with this E-Mail")
    
            }
          });

      }else{
        // setEmail_visible_criteria(true)
        setVisible_criteria(false)
        alert("Enter Valid Email id")
      
  };
}
}

  return (
    <>
      <div style={Main_divStyle} className="main_div">
        <div>
          {/* <img  alt="mrs_logo" height="70px" /> */}
        </div>
        <div className="card_div">
          <h4>Reset Password </h4>
          <div
            style={{
              height: "350px",
              width: "700px",
              borderRadius: "10px",
              display:"flex",
              // justifyContent:"space-between",
              // alignItems:"center",
              gap:"60px",
              padding: "20px",
              backgroundColor:"rgb(252, 249, 240)",
              color: "black",
              // border:"1px solid black",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            <h4><strong>Forgot Your Password?</strong></h4>
            <p style={{ fontSize: "small",fontWeight:500 }}>Submit your email address and we will send you a link to
              reset your password</p>
            <label>
              Email:<span style={{color:"red"}}>*</span>
              <br />
              <input type="email" style={{border:"0.5px solid grey",borderRadius:"5px",width:"90%"}} ref={emailRef} placeholder="Enter Email-ID" required />
              <p
                style={{
                  fontSize: "x-small",
                  color: "red",
                  display: visible_criteria ? "" : "none",
                }}
                id="pass_para"
              >
                {visible_criteria ?'Email is required!':''}
                {/* {email_visible_criteria ?'Invalid E-mail':''} */}
              </p>
            </label>

            
            <input
              type="button"
              // value= "Send Reset Link"
              value= {loading ? "Sending Link...":"Send Reset Link"}
              onClick={handleSubmit}
              style={{
                backgroundColor:"rgb(68, 137, 246)",
                color:"white",
                borderRadius:"5px",
                border:"none",
                boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                cursor:"pointer",
                width:"40%",
                alignSelf:"center",
                marginTop:"15px",
              }}
              disabled={loading} // Disable the button when loading is true
            />
            </div>
            <div style={{display:"flex",marginTop:"50px",backgroundColor:"",width:"200px"}}>
            {/* <img src={} alt="mrs_logo" height="70px" /> */}


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset_pass;
