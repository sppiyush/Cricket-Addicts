// Remove the import image as we don't need it
// we will use this page for client side rendering
'use client'
import BlogList from "@/Components/BlogList";
import Header from "@/Components/Header"
import Footer from "@/Components/Footer"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  // After removing the default codes in the return function, we will create a new fragment
  //  Here we will mount the different components
  return (
    <>
      <ToastContainer theme="dark"/>
      <Header/>
      <BlogList/>
      <Footer/>
    </>
  
  );
}
