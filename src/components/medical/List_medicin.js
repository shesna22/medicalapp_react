import React, { useEffect, useState } from 'react'
import Post_listitem from './Post_listitem'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import Navbar from '../Navbar'



function List_medicin(){
const user=useSelector(store=>store.auth.user)
const [posts,setPosts]=useState([])
const navigate=useNavigate();
function fetchPosts(){
    axios.get(" http://127.0.0.1:8000/djangoapi/list",
    {headers:{'Authorization':`Token ${user.token}`}})
    .then(response=>{setPosts(response.data)
        navigate("/list")
    })
}
useEffect(()=>{
    fetchPosts()
},[])
const navigateList = () => {
    // 👇️ navigate to /
    navigate('/search');
  };


  return (
    <div>
         <Navbar></Navbar>
    
    <div>
        <div className='container'>
            <div className='row mx-auto'>
                <div className='col-8'>
                    <h2 className='text-center'>LIST MEDICINE_DETAILS</h2>
                    <table className='table table-bordered table-stripped'>
                        <thead className='bg-secondary text-center'>
                            <tr>
                                <th>Medicin_Name</th>
                                <th>Company</th>
                                <th>Expiry_Date</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                        {posts.map(post => <Post_listitem key={post.id} post={post} refresh={fetchPosts}/>)}
                        </tbody>
                    </table>
<Link to={"/add"} className="btn btn-info mr-3">Add Medicine</Link>
<button className="btn btn-secondary" onClick={ navigateList}>Search medicine</button>

                </div>

            </div>

        </div>
    </div>
    </div>
  )
}

export default List_medicin