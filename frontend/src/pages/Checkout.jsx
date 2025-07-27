import React from "react";

export default function Checkout() {
  return (
    <div className="container mx-auto px-4">
      <div className="section-gap">
        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold uppercase">
            Complete Checkout
          </h2>
          <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Billing / Shipping */}
          <div>
            <form className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Shipping Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="input col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="input col-span-2"
                  />
                  <input type="text" placeholder="City" className="input" />
                  <input type="text" placeholder="State" className="input" />
                  <input type="text" placeholder="ZIP Code" className="input" />
                  <input type="text" placeholder="Country" className="input" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Payment</h3>
                {/* Replace this with your payment method integration */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Card No"
                    className="input col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Card Expiry"
                    className="input"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="input"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn transition"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="bg-gray-50 p-6 rounded-md shadow-sm">
              <div className="space-y-4">
                {/* Example product */}
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Product Name</p>
                    <p className="text-sm text-gray-500">Qty: 1</p>
                  </div>
                  <p className="font-semibold">$100.00</p>
                </div>
                {/* Add more products here */}

                {/* Totals */}
                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>$100.00</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>$10.00</p>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>$110.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
