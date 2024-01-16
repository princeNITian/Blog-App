import React, { useEffect, useState } from 'react'
import axios from 'axios';

const BlogCard = () => {
  const [posts,setPosts] = useState([]);
  const [user,setUser] = useState(null);

  const baseUrl = 'http://localhost:5000'
  useEffect(() => {
    axios.get(`${baseUrl}/blog/`)
    .then(response => {
        console.log(response.data.posts);
        setPosts(response.data.posts);
    })
    .catch(error => {
        console.log('Error fetching data: ', error);
    })
  },[]);

  return (
    <div className='mt-2'>
        <div className="row">
        <div className="col-md-3">
            <ul>
            {
                posts.map((post,index) => {
                    return (
                        <li className="bg-secondary m-1">{post.title}</li>
                    )
                })
            }
            </ul>
        </div>
        <div className="col-md-9">
        {
            posts.map((post,index) => {
                return (
                    <div key={post.user} className="card mb-2" style={{}}>
                        <img src={post.image} className="card-img-top" alt="not found" />
                        <div className="card-body">
                        <h3 className="card-title">
                            {post.title}
                        </h3>
                            <p className="card-text">{post.text}</p>
                        </div>
                    </div>
                )
            })
        }
        </div>
        
        </div>
    </div>
  )
}

export default BlogCard