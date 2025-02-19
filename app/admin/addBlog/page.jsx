'use client'
import { assets } from '@/Assets/assets'
import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios' 
import { toast } from 'react-toastify'


// we will use axios to send the form data to APIs 
const page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "International",
    author: "Piyush Kumar",
    authorImg: "/author_img.png"
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
    console.log(data);
  }

  // Creating onSubmit Handler for the form , prevent default is used so that when we click on the add button it doesnt refresh the webpage
  // We need to create APIs which will store data in our MongoDB database 
  //Our backend and forntend port is running on the same port 
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('author', data.author);
    formData.append('image', image);
    formData.append('authorImg', data.authorImg);
    const response = await axios.post('/api/blog',formData);
    if(response.data.success){
      toast.success(response.data.msg)
    }
    else{
      toast.error("Error")
    }
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload thumbnail</p>
        <label htmlFor="image">
          <Image className='mt-4' src={!image ? assets.upload_area : URL.createObjectURL(image)} width={140} height={70} alt='' />
        </label>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        <p className='text-xl mt-4'>Blog title</p>
        <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-3 py-3 border' type="text" placeholder='Type here' required />

        <p className='text-xl mt-4'>Blog Description</p>
        <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-3 py-3 border' type="text" placeholder='Write content here' rows={6} required />

        <p className='text-xl mt-4'>Blog Category</p>
        <select name="category" onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
          <option value="International">International</option>
          <option value="Leagues">Leagues</option>
          <option value="Domestic">Domestic</option>
        </select>
        <br />
        <button type="submit" className='mt-5 w-40 h-12 bg-black text-white'>ADD</button>
      </form>
    </>
  )
}
export default page

