import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'


const Header = () => {
  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center'>
            <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto'/>
            <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#D0312D]'>Get started<Image src={assets.arrow} alt=''/></button>
        </div>

        <div className='text-center my-8'>
            <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
            <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>Step into the world of cricket with all the latest news and drama, where every boundary, wicket, and controversy is just a click away, keeping you connected to the heartbeat of the game!</p>
        </div>
        {/* This paragraph is commented out */}
        <form className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#D0312D]'>
          <input type="email" placeholder='Enter your email' className='pl-4 outline-none'/>
          <button type='submit' className='border-l border-black py-4 px-4 sm:px-8 active:bg-red-600 active:text-white'>Subscribe</button>
        </form>
      
    </div>
  )
}

export default Header