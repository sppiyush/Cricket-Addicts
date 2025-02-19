// Here we will create the APIs to manage our blog data
import {ConnectDB} from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server")
import {writeFile} from 'fs/promises'
const fs = require('fs')
// we will use this LoadDB function to connect to the database


const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

// API Endpoint to get all blogs 
export async function GET(request){
     
     const blogId = request.nextUrl.searchParams.get("id");
     if (blogId) {
         const blog = await BlogModel.findById(blogId);
         return NextResponse.json(blog);
     }
     else{
      const blogs = await BlogModel.find({});
      return NextResponse.json({blogs})
     }
    
}


// API Endpoint for uploading Blogs 
export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      throw new Error('Invalid Content-Type. Expected multipart/form-data.');
    }

    const formData = await request.formData();
    const image = formData.get('image');

    if (!image) {
      throw new Error('Image file is missing in the form data.');
    }

    const timestamp = Date.now();
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
      title:`${formData.get('title')}`,
      description:`${formData.get('description')}`,
      category:`${formData.get('category')}`,
      author:`${formData.get('author')}`,
      image:`${imgUrl}`,
      authorImg:`${formData.get('authorImg')}`
    }

    // now we will have to store this data in the database 
    await BlogModel.create(blogData);
    console.log("Blog Saved");


    return NextResponse.json({success:true,msg:"Blog Added" });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}


// Creating API Endpoint to delete Blog 
export async function DELETE(request){
  const id = await request.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`,()=>{});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({msg:"Blog Deleted"});
}
