import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import axios from 'axios'

 function Register(){
    const [Username,setUsername]=useState("")
    const [Email,setEmail]=useState("")
    const[Password,setPassword]=useState("")
    const[Confirmpassword,setConfirmpassword]=useState("")
    const[ErrorMessage,setErrorMessage]=useState("")
    var navigate=useNavigate()
    function Registeruser(){
        var user={
            username:Username,
            email:Email,
            password:Password,
            password_confirmation:Confirmpassword,
        }
        axios.post(' http://127.0.0.1:8000/djangoapi/signupapi',user).then(response=>{
            setErrorMessage('');
            navigate('/login');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            }else{
                setErrorMessage('Failed to connect to api');
            }
        })
    }

  return (
    <div>
         <Navbar></Navbar>
    
    <div className='container'>
        <div className='row'>
            <div className='col-8 offset-2'>
                <h1>Register</h1>
                {ErrorMessage?<div className="alert alert-danger">{ErrorMessage}</div>:''}
                <div className='form-group'>
                <label >Username</label>
                <input type="text" value={Username} className='form-control' onChange={(event)=>{setUsername(event.target.value)}}/>
                </div>
                <div className='form-group'>
                <label>Email</label>
                <input type="email" className='form-control' value={Email} onChange={(event)=>{setEmail(event.target.value)}}/>
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input type='password' className='form-control' value={Password} onChange={(event)=>{setPassword(event.target.value)}}/>
            </div>
            <div className='form-group'>
                <label>Confirm Password</label>
                <input type='password' className='form-control' value={Confirmpassword} onChange={(event)=>{setConfirmpassword(event.target.value)}}/>
            </div>
            <div className='form-group'>
                <button className='btn btn-info' onClick={Registeruser}>Register</button>

            </div>
            </div>

        </div>
</div>
    </div>
  )
}
export default Register;
