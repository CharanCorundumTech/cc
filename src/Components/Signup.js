import React from 'react'
import './Signin.css'
// import asset1 from '../Assets/Asset13ldpi.png'
// import asset2 from '../Assets/Asset14ldpi.png'
// import asset4 from '../Assets/block.svg'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../Service/authService'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import eaglelogo from '../Assets/signin_img.jpeg'
import topright from '../Assets/Asset 1.png'
import bottomleft from '../Assets/Asset 2.png'
import axios from 'axios'

const Signup = () => {
    const [userName,setUserName]= useState('');
    const [password,setPassword]= useState('');
    const [loginError, setLoginError] = useState(false);
    const [visible,setVisible]=useState(false);
    const showpassword = useRef('')
    const email = useRef('')
    const name = useRef('')
    const role = useRef('')
    const email_is = email.current.value
    const name_is = name.current.value
    const role_is = role.current.value
    // console.log(email_is,name_is,role_is)
    const [toggleLoginLoader,setToggleLoginLoader]=useState(false);

    const showToast = (message) => {
            toast.error(message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2000,
              });
      };


    const toogleShowPassword = ()=>{
        setVisible(!visible)
        showpassword.current.type= visible ? 'password':'text';
        
    }
      
    const navigate = useNavigate();
    const signupAction = async () => {
      if (email_is === '' || name_is === '' || role_is === '') {
        showToast('Please fill in all fields');
      } else {
        try {
          setLoginError(false);
          setToggleLoginLoader(true);
          const payload={
            "email":email_is,
            "role":role_is,
            "name":name_is
          }
          console.log(email_is)
          console.log(role_is)
          console.log(name_is)
          const response = await axios.post('http://192.168.145.72:8000/signup', payload);
          const responseData = response.data;
          console.log("response=====",responseData)
          
        
          console.log(response.status)
          const status=response.status
          if (status === 200) {
            navigate('/reset_instructions');
          } else if (status === 400) {
            setLoginError(true);
          showToast('Bad request');
          } else if (status === 409) {
            setLoginError(true);
          showToast('User Already Exists ');
          }else if (status === 404) {
            setLoginError(true);
          showToast('Not Found');
          }else if (status === 500) {
            setLoginError(true);
          showToast('Internal Server Error!');
          }
          else {
            showToast('Invalid user role');
          }
        } catch (error) {
          const error_status=error.response.status
          if (error_status === 200) {
            navigate('/reset_instructions');
          } else if (error_status === 400) {
            setLoginError(true);
          showToast('Bad request');
          } else if (error_status === 409) {
            setLoginError(true);
          showToast('User Already Exists ');
          }else if (error_status === 404) {
            setLoginError(true);
          showToast('Not Found');
          }else if (error_status === 500) {
            setLoginError(true);
          showToast('Internal Server Error!');
          }
          else {
            showToast('Invalid user role');
          }
          // console.log(error.response.status)
          // setLoginError(true);
          // showToast('Wrong email or password');
        } finally {
          setToggleLoginLoader(false);
        }
      }
    };
  return (
    <>
    <div style={{width:"100%",height:"90%",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div style={{width:"50%",padding:"2.5rem",display:"flex",flexDirection:"column",gap:"30px",margin:"15px",border:"1px solid black",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
    <h2 style={{marginLeft:"2.5rem",marginRight:"2.5rem",padding:"10px",backgroundColor:"",color:"black"}}>Sign Up</h2>


<div className='input-tags'>
  <label className='emaail_label'>Email :</label>
  <input style={{borderRadius:"10px",border:"1px solid grey"}} type='email' ref={email} onChange={(e) => setUserName(e.target.value)} placeholder='john.doe@gmail.com'></input>
</div>
<div className='input-tags'>
  <label className='emaail_labdel'>Name :</label>
  <input style={{borderRadius:"10px",border:"1px solid grey"}} type='text' ref={name} onChange={(e) => setUserName(e.target.value)} placeholder='username'></input>
</div>
{/* <div className='input-tags'>
  <label className='emaail_label'>Password :</label>
  <div style={{ position: 'relative', width: '100%' }}>
    <input style={{borderRadius:"10px",border:"1px solid grey"}} ref={showpassword} type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password'></input>
    <div onClick={toogleShowPassword} style={{ display: 'flex', position: 'absolute', bottom: 0, right: 0, marginBottom: '10px', marginRight: '8px' }} className='showpass-icon-contianer'>
      {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </div>
  </div>

</div>
<div className='input-tags'>
  <label className='emaail_label'>Confirm Password :</label>
  <div style={{ position: 'relative', width: '100%' }}>
    <input style={{borderRadius:"10px",border:"1px solid grey"}} ref={showpassword} type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password'></input>
    <div onClick={toogleShowPassword} style={{ display: 'flex', position: 'absolute', bottom: 0, right: 0, marginBottom: '10px', marginRight: '8px' }} className='showpass-icon-contianer'>
      {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </div>
  </div>

</div> */}
<div className='input-tags'>
  <label className='emaail_label'>Role :</label>
  <input style={{borderRadius:"10px",border:"1px solid grey"}} type='text' ref={role} onChange={(e) => setUserName(e.target.value)} placeholder='role'></input>
</div>
<div>
<button onClick={signupAction} style={{height:"40px",width:"87%",marginLeft:"2.5rem",marginRight:"2.5rem",borderRadius:"5px",border:"none",backgroundColor:"orange",color:"white"}}><b>Sign Up</b></button>
</div>
</div>
</div>
    </>
  )
}

export default Signup