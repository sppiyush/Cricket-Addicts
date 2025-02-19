import {blog_data} from '@/Assets/assets'
import React, {useEffect,useState} from 'react'
import BlogItem from './BlogItem'
import axios from 'axios';
const BlogList = () => {

    const [menu,setMenu] = useState("All");
    const [blogs,setBlogs] = useState([]);

    const fetchBlogs = async () =>{
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs);
        console.log(response.data.blogs);
    }

    useEffect(()=>{
        fetchBlogs();
    },[])

  return (
    <div>
        {/*We will create a selection tab*/}
        <div className='flex justify-center gap-6 my-10'>
            <button onClick={()=>setMenu('All')} className={menu==="All"?'bg-red-700 text-white py-1 px-4 rounded-sm':""}>All</button>
            <button onClick={()=>setMenu('International')} className={menu==="International"?'bg-red-700 text-white py-1 px-4 rounded-sm':""}>International</button>
            <button onClick={()=>setMenu('Leagues')} className={menu==="Leagues"?'bg-red-700 text-white py-1 px-4 rounded-sm':""}>Leagues</button>
            <button onClick={()=>setMenu('Domestic')} className={menu==="Domestic"?'bg-red-700 text-white py-1 px-4 rounded-sm':""}>Domestic</button>
        </div>
        
        {/*We will return the blog items through this blog list bascially we are creating another container here which will return the values and using the menu we will filter the data*/}
        <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
            {blogs.filter((item)=> menu==="All"?true:item.category===menu).map((item,index)=>{
                return <BlogItem key={index} id={item._id} image={item.image} title={item.title} description={item.description} category={item.category}/>
            })}
        </div>
      
    </div>
  )
}

export default BlogList
