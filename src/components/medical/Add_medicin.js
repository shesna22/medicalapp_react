import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Navbar from '../Navbar';

function Add_medicin(){
    const user=useSelector(store=>store.auth.user)
    const [Mediname,setMediname]=useState("")
    const [Company,setCompany]=useState("")
    const [Expiry,setExpiry]=useState("")
    var navigate=useNavigate();
    function addData(){
        axios.post(' http://127.0.0.1:8000/djangoapi/add',{
            name:Mediname,
            company:Company,
            expiry_date:Expiry,
        },
        {headers:{'Authorization':`Token ${user.token}`}})
        .then(response=>{
            navigate('/list')
        });
    };
    return(
        <div>
             <Navbar></Navbar>
<div >
    <div className='container'>
        <div className='row'>
            <div className='col-8 offset-2'>
            <h1>CREATE POST</h1>
            <div className='form-group'>
                <label>Medicin_Name</label>
                <input type="text" className='form-control' value={Mediname} onChange={(event)=>{setMediname(event.target.value)}}/>
            </div>
            <div className='form-group'>
                <label>Company</label>
                <input type='text' value={Company} className='form-control' onChange={(event)=>{setCompany(event.target.value)}}/>
            </div>
            <div className='form-group'>
                <label>Expiry_Date</label>
                <input type='date' value={Expiry} className='form-control' onChange={(event)=>{setExpiry(event.target.value)}}/>
            </div>
            <div className='form-group'>
                <button className='bg-info' onClick={addData}>AddMedicin</button>

            </div>
        </div>
        </div>
    </div>
</div>
</div>
    )
}
export default Add_medicin