import React from 'react'
import Navbar from '../Navbar'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
function View (){
  const user=useSelector(store=>store.auth.user);
    var {postId} = useParams()
    var [post,setPost] = useState({name:'',company:'',expiry_date:''})
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/djangoapi/viewapi/'+postId,
        {headers:{'Authorization':`Token ${user.token}`}})
        .then(response=>{
            setPost(response.data)
        })
    },[postId]);
    const navigateList = () => {
        // 👇️ navigate to /
        navigate('/list');
      };
  return (
    <div>
         <Navbar></Navbar>
    
    <div className='container'>
        <div className='row'>
            <div className='card-8'>
            <div className='card'>
                <div className='card-head'> VIEW DETAILS</div>
                <div className='card-body'>{post.name}</div>
                <div className='card-body'>{post.company}</div>
                <div className='card-body'>{post.expiry_date}</div>
            </div>
            <button type="button" className="btn btn-info"onClick={navigateList}>Back</button>
</div>
        </div>
        <div>
</div>
        </div>
    </div>
  )
}

export default View