import React from 'react'
import { StarRating } from '../common/StarRating'


export const ProductDetailsInfo = ({product}) => {
  return (
    <div className='product-details-info flex flex-col gap-4 py-4'>
        <h2 className='text-2xl font-bold'>{product.name}</h2>
        <StarRating rating={product.rating}/>
        <p>InStock : {product.stock}</p>
        <p className='text-lg font-semibold'>${product.price}</p>
    </div>
  )
}
