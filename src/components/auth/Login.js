import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from "react-redux";
import Navbar from '../Navbar'
import { setUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
function Login(){
    const [Email,setEmail]=useState("")
    const[Password,setPassword]=useState("")
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate=useNavigate()
    function attemptLogin() {
        axios.post('http://127.0.0.1:8000/djangoapi/loginapi',{
            email:Email,
            password:Password
        }).then(response=>{
            setErrorMessage('')
            var user = {
                email:Email,
                token:response.data.token
            }
            dispatch(setUser(user));
            navigate("/list")
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(''))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }
  return (
    <div>
         <Navbar></Navbar>
    
    <div className='container'>
        <div className='row'>
            <div className='col-8 offset-2'>
                <h1>LOGIN PAGE</h1>
                {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' className='form-control' value={Email} onChange={(event)=>{setEmail(event.target.value)}}/>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type='password' className='form-control' value={Password} onChange={(event)=>{setPassword(event.target.value)}}/>
                </div>
                <div className='form-group'>
                <button className="btn btn-primary float-right" onClick={attemptLogin}>Login</button>
                </div>


            </div>

        </div>
</div>
    </div>
  )
}

export default Login