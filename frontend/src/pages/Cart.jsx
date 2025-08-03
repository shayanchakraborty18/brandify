import React from "react";
import { useCart } from "../context/CartContext";
import { StarRating } from "../components/common/StarRating";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItem, removeFromCart } = useCart();
  const totalValue = cartItem.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  // console.log(cartItem);

  return (
    <div className="container mx-auto px-4">
      <div className="section-gap">
        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold uppercase">
            Your Shopping Cart
          </h2>
          <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded"></div>
        </div>
        {cartItem.length > 0 ? (
          <div className="flex gap-6">
            <div className="rounded-md shadow-md p-4 relative bg-background flex-1">
              {cartItem.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-6 border-b pb-4 mb-4 last:mb-0 last:border-b-0 last:pb-0 border-text/20"
                >
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/product/${item._id}`}
                      className="flex bg-white rounded border border-text/20 p-1"
                    >
                      <img
                        src={`https://brandify-8mm5.onrender.com/${item.images[0]?.url}`}
                        alt={item.name}
                        className="w-20 h-20"
                      />
                    </Link>
                    <div>
                      <h4 className="text-base font-semibold text-gray-800">
                        {item.name}
                      </h4>
                      <StarRating rating={item.rating} />
                      <p className="text-sm text-gray-500 font-semibold">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">
                      ${item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-sm text-red-600 hover:underline mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-md shadow-md p-4 relative group bg-background w-96">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Order Summary</h3>
              <div className="space-y-2 text-gray-700 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalValue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$10</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-bold border-text/20">
                  <span>Total</span>
                  <span>${totalValue + 10}</span>
                </div>
              </div>
              <button className="btn btn-primary w-full">
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold mb-6">Your Cart is Empty</p>
            <Link className="text-primary" to={"/"}>
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
