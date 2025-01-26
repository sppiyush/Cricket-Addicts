import mongoose from "mongoose";

// We use the export function because after exporting ,we can use these functions in different APIs 
export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://cricketaddicts:123456cricket@cluster0.ljnhd.mongodb.net/cricket-addicts')
    console.log("DB Connected");
}