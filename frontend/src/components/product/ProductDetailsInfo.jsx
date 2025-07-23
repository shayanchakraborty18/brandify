import React from 'react'
import { StartRating } from '../common/StartRating'


export const ProductDetailsInfo = ({product}) => {
  return (
    <div className='product-details-info flex flex-col gap-4 py-4'>
        <h2 className='text-2xl font-bold'>{product.name}</h2>
        <StartRating rating={product.rating}/>
        <p>InStock : {product.stock}</p>
        <p className='text-lg font-semibold'>${product.price}</p>
    </div>
  )
}
