import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Post_listitem(props){
const user=useSelector(store=>store.auth.user);
const navigate=useNavigate()
function deletePost(){
  axios.delete('http://127.0.0.1:8000/djangoapi/delete/'+props.post.id,
  {headers:{'Authorization':`Token ${user.token}`}})
  .then(response=>{
    props.refresh()
    navigate("/list")
  })
}

  return (
  
            <tr>
                <td>{props.post.name}</td>
                <td>{props.post.company}</td>
                <td>{props.post.expiry_date}</td>
                <td>
                    <button className='btn btn-secondary' onClick={deletePost}>Delete</button>
                    <Link to={"/"+props.post.id+"/edit" } className='btn btn-secondary'>Edit</Link>
                    <Link to={"/"+props.post.id} className='btn btn-secondary'>View</Link>
                </td>

            </tr>
      
  )
}

export default Post_listitem