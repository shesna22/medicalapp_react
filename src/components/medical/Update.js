

import React, { useState } from 'react'
import Navbar from '../Navbar'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

function Update(){
  const user=useSelector(store=>store.auth.user)
  const {postId}=useParams()
    const [Mediname,setMediname]=useState("")
    const [Company,setCompany]=useState("")
    const [Expiry,setExpiry]=useState("")
    var navigate = useNavigate();
    useEffect(()=>{
        axios.put('http://127.0.0.1:8000/djangoapi/update/'+postId,
        {headers:{'Authorization':`Token ${user.token}`}})
        .then(response=>{
            setMediname(response.data.name);
            setCompany(response.data.company);
            setExpiry(response.data.expiry_date);
        })
        .catch((error)=>{
            console.error('Error fetching medicine data:',error);
        });
    },[postId]);
    function updatePost(){
        axios.put('http://127.0.0.1:8000/djangoapi/update/'+postId,{
            name:Mediname,
            company:Company,
            expiry_date:Expiry,
        
        },{headers:{'Authorization':`Token ${user.token}`}})
        .then(response=>{
            navigate('/list');
        })
        .catch((error)=>{
            console.error('Error updating medicine data:',error);
        });
    }
  
  return (
    <div>
         <Navbar></Navbar>
    
    <div className='container'>
        <div className='row'>
            <div className='col-8 offset-2'>
            <h2 className='text-center'>UPDATE</h2>
            <div className='form-group'>
            <label>Medicin_Name</label>
            <input type='text' className='form-control' value={Mediname} onChange={(event)=>{setMediname(event.target.value)}}/>
            </div>
            <div className='form-group'>
            <label>Company</label>
            <input type='text' className='form-control' value={Company} onChange={(event)=>{setCompany(event.target.value)}}/>
            </div>
            <div className='form-group'>
            <label>Expiry_Date</label>
            <input type='date' className='form-control' value={Expiry} onChange={(event)=>{setExpiry(event.target.value)}}/>
            </div>
            <div className='form-group'>
                <button className='btn btn-primary'  onClick={updatePost}>Update</button>

            </div>

            </div>

        </div>
</div>
    </div>
  )
}

export default Update