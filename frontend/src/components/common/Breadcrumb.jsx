import React from "react";
import HomeIcon from "../../assets/icons/house-solid.svg";
import RightChevIcon from "../../assets/icons/chevron-right-solid.svg";
import { Link } from "react-router-dom";

export const Breadcrumb = ({ product }) => {
  return (
    <div className="border-b border-text/10">
      <div className="container mx-auto px-4">
        <ol role="list" className="flex items-center gap-3 text-text text-sm">
          <li>
            <div>
              <Link to="/" className="flex items-center gap-1 py-4">
                <img src={HomeIcon} alt="Home" className="w-5 h-5" />
                <span className="hidden">Home</span>
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-2 py-4">
              <img
                src={RightChevIcon}
                alt="Cart"
                className="w-4 h-4 opacity-50"
              />
              <Link to={`/${product?.category}s`} className=" capitalize">
                {product?.category}s
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-2 py-4">
              <img
                src={RightChevIcon}
                alt="Cart"
                className="w-4 h-4 opacity-50"
              />
              <Link
                to={`/product/${product?.id}`}
                aria-current="page"
                className="capitalize"
              >
                {product?.name}
              </Link>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};
