import React, { useState, useEffect } from "react";
import { IMAGE_PATH } from "../../utils/constants";

export const ProductImage = ({ product }) => {
  const [mainImg, setMainImg] = useState("");

  // console.log(product.images.url)

  useEffect(() => {
    if (product?.images?.length) {
      setMainImg(product.images[0].url);
    }
  }, [product]);

  if (!product || !product.images?.length) {
    return <div className="p-4 text-gray-500">No image available</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      

      <div className="flex-1 md:order-2 relative">
        <img
          src={`${IMAGE_PATH}/${mainImg}`}
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg"
        />
        {product.new_arrival && (
          <div className="absolute top-0 left-0 bg-primary text-white text-sm px-2 py-1 rounded-br-lg">
            New Arrival
          </div>
        )}
        {product.on_sale && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-sm px-2 py-1 rounded-bl-lg">
            On Sale
          </div>
        )}
      </div>
      <div className="flex md:order-1 md:flex-col flex-row items-center space-y-4 w-full md:w-[108px] max-h-[484px] overflow-y-auto">
        {}
        {product?.images?.map((item, index) => (
          <div
            className="flex justify-center flex-1"
            key={index}
            onClick={() => setMainImg(item.url)}
          >
            <img
              src={`${IMAGE_PATH}/${item.url}`}
              className="w-auto h-full object-cover rounded-lg cursor-pointer hover:shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
