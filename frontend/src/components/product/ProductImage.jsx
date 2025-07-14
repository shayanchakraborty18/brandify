import React from 'react'

export const ProductImage = ({product}) => {
  return (
    // <div classNameName='product-image grid grid-cols-2 gap-2'>
    //     <div classNameName='grid col-span-1 gap-2 max-h-60'>
    //         <div classNameName='product-thum'>
    //             <img src={product.image} alt={product.name} />
    //         </div>
    //         <div classNameName='product-thum'>
    //             <img src={product.image} alt={product.name} />
    //         </div>
    //         <div classNameName='product-thum'>
    //             <img src={product.image} alt={product.name} />
    //         </div>
    //     </div>
    //   <img src={product.image} alt={product.name} />
    // </div>
    <div className="flex">

      <div className="flex flex-col items-center p-4 space-y-4 w-1/5">
        <div className="flex justify-center h-1/4">
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg cursor-pointer hover:shadow-lg"/>
        </div>
        <div className="flex justify-center h-1/4">
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg cursor-pointer hover:shadow-lg"/>
        </div>
        <div className="flex justify-center h-1/4">
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg cursor-pointer hover:shadow-lg"/>
        </div>
        <div className="flex justify-center h-1/4">
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg cursor-pointer hover:shadow-lg"/>
        </div>
      </div>

   
      <div className="flex-1 p-4">
        <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg"/>
      </div>
    </div>
  )
}
