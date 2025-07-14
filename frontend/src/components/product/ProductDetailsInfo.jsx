import React from 'react'

export const ProductDetailsInfo = ({product}) => {
  return (
    <div className='product-details-info flex flex-col gap-4 py-4'>
        <h2 className='text-2xl font-bold'>{product.name}</h2>
        <p className='text-lg font-medium'>${product.new_price}</p>
        <p className='text-lg font-medium line-through'>${product.old_price}</p>
        {/* <p className='text-lg font-medium'>{product.description}</p> */}
    </div>
  )
}
