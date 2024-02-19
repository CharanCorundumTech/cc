import React, { useEffect } from 'react'
import './Login.css'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import topright from '../Assets/Asset 1.png'
import bottomleft from '../Assets/Asset 2.png'
import logoHome from '../Assets/signin_img.jpeg'
import axios from 'axios'
import apiConfig from '../env'

const Signin = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [visible, setVisible] = useState(false);
    const [toggleLoginLoader, setToggleLoginLoader] = useState(false);
    const email_ref = useRef('')
    const showpassword = useRef('')
    const email_is = email_ref.current.value
    const password_is = showpassword.current.value

    useEffect(() => {
      email_ref.current.focus();
    }, []); 

    const showToast = (message) => {
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000,
        });
    };
    const toogleShowPassword = () => {
        setVisible(!visible)
        showpassword.current.type = visible ? 'password' : 'text';
    }
    const navigate = useNavigate();
    const loginAction = async () => {
      if (email_is === '' || password_is === '') {
        showToast('Please fill in all fields');
      } else {
        try {
          setLoginError(false);
          setToggleLoginLoader(true);
          const payload={
            "username":email_is,
            "password":password_is
          }
          console.log(password_is)
    console.log(email_is)
          const response = await axios.post(`${apiConfig.baseUrl}/login`, payload);
          const responseData = response.data;
          console.log("response=====",responseData)
          const userToken = responseData.token;
          console.log(userToken)
          try {
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('role', responseData.role);
            localStorage.setItem('username', responseData.username);
         } catch (error) {
            console.error("LocalStorage Error:", error);
         }
          const userRole = responseData.role; 
          console.log(response.data)
          // Redirect based on userrole
          if (userRole === 'user') {
            navigate('/dashboard');
          } else if (userRole === 'reviewingManager') {
            navigate('/dashboard');
          }else if (userRole === 'reportingManager') {
            navigate('/dashboard');
          }else if (userRole === 'approvingManager') {
            navigate('/dashboard');
          } else {
            showToast('Invalid user role');
          }
        } catch (error) {
          setLoginError(true);
          showToast('Wrong email or password');
        } finally {
          setToggleLoginLoader(false);
        }
      }
    };

    return (

        <>
            <div style={{ position: "relative", height: "100vh", width: "100%", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "", alignItems: "" }}>
                <img style={{position:'absolute', width:'40%', height:'60vh', right:0}} src={topright}></img>
                <img style={{position:'absolute', width:'30%', height:'40vh', bottom:0, left:0}} src={bottomleft}></img>
                <div style={{ position: "absolute", zIndex: "", backgroundColor: "", height: "100vh", width: "100%", display: "flex", gap: "20px", justifyContent: "center", alignItems: "center" }}>

                    <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',width:'50%',gap:'2rem' }}>
                    <h2 style={{fontSize:'50px'}} className='login-caption'>ELECTRON</h2>
                    <h3 style={{fontSize:'13px'}} className='login-caption'>Election Logging, Evaluation, and Comprehensive Tracking Resource for Online Networks</h3>
                        <img style={{borderRadius:'8px', marginBottom:'1rem'}}  src={logoHome}  height="300px" width="80%" alt='logo'></img>
                    </div>
                    <div style={{ width: '50%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <div style={{paddingTop:'2rem', paddingBottom:'2rem', height: "60vh",width:'60%', padding: "0px", display: "flex", flexDirection: "column", justifyContent: "center", background: 'white', boxShadow: '-3px 0px 15px -6px rgba(18,227,227,1)', borderRadius: "22px", borssder: '1px #BCBCBC solid' }} >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginRight: "50px", backgroundColor: "" }}><h2 style={{ color: '#60b1d4' }} className='login_h2 input-tags'>Login </h2>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "30px", marginTop: "10px" }}>
                            <div className='input-tags'>
                                <label className='emaail_label'>Username :</label>
                                <input ref={email_ref} style={{ borderRadius: "10px", border: "1px solid grey" }} type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter Username'></input>
                            </div>
                            <div className='input-tags'>
                                <label className='emaail_label'>Password :</label>
                                <div style={{ position: 'relative', width: '100%' }}>
                                    <input style={{ borderRadius: "10px", border: "1px solid grey" }} ref={showpassword} type='password' onChange={(e) => setPassword(e.target.value)} placeholder='********'></input>
                                    <div onClick={toogleShowPassword} style={{ display: 'flex', position: 'absolute', bottom: 0, right: 0, marginBottom: '10px', marginRight: '8px' }} className='showpass-icon-contianer'>
                                        {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={loginAction} style={{ marginLeft: "2.5rem", marginTop: "2.5rem", border: "none", backgroundColor:'#60b1d4' }} className='login-btn' disabled={toggleLoginLoader}>
                            {toggleLoginLoader ? (
                                <div className='loader'></div>
                            ) : (
                                <strong>LOG IN</strong>
                            )}
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin