// Here we will create the schema and the model for the blog app 
import mongoose from "mongoose";
// Using this constructor function we will create a schema 
const Schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true 
    },
    author:{
        type:String,
        required:true
    },
    image:{
        type:String, 
        required:true
    },
    authorImg:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }


})

const BlogModel = mongoose.models.blog || mongoose.model('blog',Schema);

export default BlogModel;