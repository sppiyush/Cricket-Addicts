import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row py-5 items-center' style={{ backgroundColor: '#D84040' }}>
      <Image src={assets.logo} alt='' width={120} />
      <p className='text-sm text-white'>All right reserved. Copyright @CricketAddicts</p>
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
  )
}

export default Footer
