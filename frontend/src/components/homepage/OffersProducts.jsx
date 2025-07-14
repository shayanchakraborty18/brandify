import React from 'react'
import heroImage from '@/assets/images/hero_image.png'
import offer_banner from '@/assets/online-offer.jpg'

export const OffersProducts = () => {
  return (
    <div className='bg-primary/10 py-10'>
        <div className='container mx-auto px-4'>
            <img src={offer_banner} className='w-full' alt="offer banner" />
        </div>
    </div>
  )
}
