import React from 'react'
import './Reset_instructions.css';
// import backgroundImage from "../HomePage/Main/MainBG.png";
// import mrs_logo from "../HomePage/Main/mrs_logo.png";
// import mailBox_img from '../../Assets/png-assets/Asset 25-8.png';
import { Link } from 'react-router-dom';



const Main_divStyle = {
    // backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
};

const Reset_instructions = () => {
    return (
        <>
            <div style={Main_divStyle} className='inst_div'>
                <div>
                    {/* <img src={mrs_logo} alt="mrs_logo" height="70px" /> */}
                </div>
                <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", paddingTop: "2rem" }}>
                    <div style={{ height: "300px", width: "600px", display: "flex", flexDirection: "column", justifyContent: "center", gap: '10px', alignItems: "center", borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", backgroundColor: "rgb(252, 249, 240)" }}>
                        <strong><h3>Check Your Mail</h3></strong>
                        <b><p style={{ fontSize: "small", fontFamily: "Roboto" }}>We have sent a link on your mail</p></b>
                        {/* <img src={mailBox_img} alt="mrs_logo" height="60px" /> */}
                        <p style={{ fontSize: "small", fontWeight: 600 }}>Check your email and <Link to="/" style={{ textDecoration: 'none' }}><span style={{ color: "red" }}>Log In</span></Link></p>
                        <p style={{ fontSize: "small", fontWeight: 600 }}>Did not receive the email? Check your spam filter.
                            or <Link to="/forgot_pwd" style={{ textDecoration: 'none' }}><span style={{ color: "red" }}>Try another email address</span></Link> </p>

                    </div>
                </div>


            </div>
        </>
    )
}

export default Reset_instructions