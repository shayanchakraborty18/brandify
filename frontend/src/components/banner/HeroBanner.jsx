import React from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../../assets/images/vivo-banner.jpg'


export const HeroBanner = () => {
  return (
    <div className='heroBanner bg-linear-to-tl from-primary/20 to-bg'>
      {/* <div className='container mx-auto px-4'>
        <div className='flex flex-col-reverse lg:flex-row items-center justify-between py-8'>
          <div className='lg:w-1/2'>
            <h1 className='text-4xl font-bold'>
              <span className='text-text'>Urban</span> <span className='text-primary'>Nest</span>
            </h1>
            <p className='text-2xl my-4'>
              The best place to find your perfect outfit.
            </p>
            <Link to="/mens" className='btn btn-primary mt-4'>
              Shop Now
            </Link>
          </div>
          <div className='lg:w-1/2 flex justify-center'>
            <img src={heroImage} className='w-[400px]' alt="banner" />
          </div>
        </div>
      </div> */}

      <img src={heroImage} className='w-full' alt="banner" />
    </div>
  )
}
