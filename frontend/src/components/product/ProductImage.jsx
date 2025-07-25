import React, { useState, useEffect } from "react";

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
    <div className="flex">
      <div className="flex flex-col items-center p-4 space-y-4 w-1/5">
        {}
        {product?.images?.map((item, index) => (
          <div
            className="flex justify-center h-1/4"
            key={index}
            onClick={() => setMainImg(item.url)}
          >
            <img
              src={`http://localhost:3000/${item.url}`}
              className="w-full h-auto object-cover rounded-lg cursor-pointer hover:shadow-lg"
            />
          </div>
        ))}
      </div>

      <div className="flex-1 p-4">
        <img
          src={`http://localhost:3000/${mainImg}`}
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  );
};
