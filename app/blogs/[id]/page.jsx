'use client'
import { assets, blog_data } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get('/api/blog', {
      params: { id: params.id }
    });
    setData(response.data);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  useEffect(() => {
    // Ensure Twitter embeds are loaded properly
    const loadTwitterScript = () => {
      if (!window.twttr) {
        const twitterScript = document.createElement("script");
        twitterScript.setAttribute("src", "https://platform.twitter.com/widgets.js");
        twitterScript.setAttribute("async", "true");
        twitterScript.setAttribute("charset", "utf-8");
        twitterScript.onload = () => {
          if (window.twttr) {
            window.twttr.widgets.load();
          }
        };
        document.body.appendChild(twitterScript);
      } else {
        window.twttr.widgets.load();
      }
    };

    if (data?.description.includes('<blockquote class="twitter-tweet"')) {
      loadTwitterScript();
    }
  }, [data]); // Run this effect when `data` updates

  return (
    data ? (
      <>
        <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
          <div className='flex justify-between items-center'>
            <Link href='/'>
              <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto' />
            </Link>
            <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#D0312D]'>
              Get started <Image src={assets.arrow} alt='' />
            </button>
          </div>
          <div className='text-center my-24'>
            <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
            <Image className='mx-auto mt-6 border border-white rounded-full' src={data.authorImg} width={60} height={60} alt='' />
            <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
          </div>
        </div>

        <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
          <Image className='border-4 border-white' src={data.image} width={800} height={480} alt='' />
          
          {/* Render Twitter Embed Correctly */}
          <div className='blog-content' dangerouslySetInnerHTML={{ __html: data.description }}></div>

          <div className='my-24'>
            <p className='text-black font font-semibold my-4'>Share this article on social media</p>
            <div className='flex'>
              <a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL" target="_blank" rel="noopener noreferrer">
                <Image src={assets.facebook_icon} width={50} alt="Facebook" />
              </a>
              <a href="https://twitter.com/intent/tweet?url=YOUR_URL&text=Check this out!" target="_blank" rel="noopener noreferrer">
                <Image src={assets.twitter_icon} width={50} alt="Twitter" />
              </a>
              <a href="https://plus.google.com/share?url=YOUR_URL" target="_blank" rel="noopener noreferrer">
                <Image src={assets.googleplus_icon} width={50} alt="Google Plus" />
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </>
    ) : <></>
  );
};

export default Page;
