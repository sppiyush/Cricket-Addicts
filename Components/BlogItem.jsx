import { assets, blog_data } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const BlogItem = ({ title, description, category, image, id }) => {
  const isTwitterEmbed = description.includes('<blockquote class="twitter-tweet"');
  const [twitterLoaded, setTwitterLoaded] = useState(false);

  useEffect(() => {
    if (isTwitterEmbed) {
      // Check if Twitter widgets script is already present
      if (!window.twttr) {
        const twitterScript = document.createElement("script");
        twitterScript.setAttribute("src", "https://platform.twitter.com/widgets.js");
        twitterScript.setAttribute("async", "true");
        twitterScript.setAttribute("charset", "utf-8");
        twitterScript.onload = () => {
          setTwitterLoaded(true);
          window.twttr.widgets.load(); // Ensure Twitter embeds get processed
        };
        document.body.appendChild(twitterScript);
      } else {
        // If script is already loaded, refresh Twitter widgets
        setTwitterLoaded(true);
        window.twttr.widgets.load();
      }
    }
  }, [description]); // Runs when description changes

  return (
    <div 
      key={id} // Forces re-rendering of each blog item separately
      className='max-w-[330px] sm:max-w-[300px] bg-white border border-black transition-all hover:shadow-[-7px_7px_0px_#a93226]'
    >
      <Link href={`/blogs/${id}`}>
        <Image src={image} alt='' width={400} height={400} className='border-b border-black' />
      </Link>
      <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm'>{category}</p>
      <div className="p-5">
        <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>

        {/* Ensure Twitter embed loads properly */}
        {isTwitterEmbed && twitterLoaded ? (
          <div dangerouslySetInnerHTML={{ __html: description.slice(0,120) }} />
        ) : (
          <p className='mb-3 text-sm tracking-tight text-gray-700'>
            {description.slice(0, 120)}...
          </p>
        )}

        <Link href={`/blogs/${id}`} className='inline-flex items-center py-2 font-semibold text-center'>
          Read more <Image src={assets.arrow} className='ml-2' alt='' width={12} />
        </Link>
      </div>
    </div>
  );
}

export default BlogItem;
