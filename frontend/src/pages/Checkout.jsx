import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { toast } from 'react-toastify';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import api from "../api/axios";
import { US_STATES } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItem, clearCart } = useCart();
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  console.log("Cart Items:", cartItem);

  const totalValue = cartItem.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  const paymentData = {
    amount: Math.round(totalValue + 10), // Convert to cents
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!stripe || !elements) {
        toast.error("Stripe.js has not loaded yet.");
        return;
      }
      if (!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.email || !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zip || !shippingInfo.phone) {
        toast.error("Please fill in all shipping information fields.");
        return;
      }
      if (cartItem.length === 0) {
        toast.error("Your cart is empty.");
        return;
      }
      if (totalValue <= 0) {
        toast.error("Total value must be greater than zero.");
        return;
      }
      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      // Send payment data to your server
      const response = await api.post('/order/payment/process', paymentData, config);
      if (response.status !== 200) {
        toast.error("Failed to process payment.");
        return;
      }

      const { client_secret } = response.data;
      console.log("Client Secret:", client_secret);
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            email: shippingInfo.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.zip,
              country: "US"
            },
          },
        },
      });
      if (result.error) {
        console.error("Payment confirmation error:", result.error);
        setErrorMessage(result.error.message);
        toast.error("Payment confirmation failed. Please try again.");
        return;
      } else {
  
        //Place order
        const shippingData = {
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          country: "US",
          pincode: shippingInfo.zip,
          phoneNumber: shippingInfo.phone,
        }
        const orderData = cartItem.map(item => ({
          product: item._id,
          name: item.name,
          price: item.price,
          image: item.images[0].url,
          quantity: item.quantity
        }));

        const paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status === 'succeeded' ? true : false,
        };
        const paylodad = {
          shippingInfo: shippingData,
          orderedItems: orderData,
          paymentInfo: paymentInfo,
          itemsPrice: totalValue,
          taxPrice: 0,
          shippingPrice: 10,
          totalPrice: totalValue + 10,  
        };
        const newOrder = await api.post('/order/new', paylodad, config);
        if (newOrder.status === 200) {
          console.log("Order placed successfully:", newOrder.data);
            toast.success("Payment successful! Thank you for your order.");
           // Redirect to success page
           clearCart();
           navigate("/success");

            // clear cart 
        } else {
          console.error("Failed to place order:", newOrder);
          toast.error("Failed to place order. Please try again.");
          return;
        }

      }
    } catch (error) {
      console.error("Error during payment processing:", error);
      setErrorMessage("An error occurred while processing your payment.");
      toast.error("An error occurred while processing your payment. Please try again.");
      return;
    }
  };

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
            {errorMessage && <div>{errorMessage}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Shipping Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="First Name"
                    className="input"
                  />
                  <input
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Last Name"
                    className="input"
                  />
                  <input
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Email"
                    className="input col-span-2"
                  />
                  <input
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Address"
                    className="input col-span-2"
                  />
                  <input
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="City"
                    className="input"
                  />
                  <select name="state" value={shippingInfo.state} onChange={handleInputChange} className="input">
                    <option value="">Select State</option>
                    {US_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <input
                    name="zip"
                    value={shippingInfo.zip}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="ZIP Code"
                    className="input"
                  />
                  <input
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    type="tel"
                    placeholder="Phone"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Payment</h3>
                {/* Replace this with your payment method integration */}
                <div className="grid grid-cols-2 gap-4">
                  <CardNumberElement
                    type="text"
                    placeholder="Card No"
                    className="input col-span-2"
                  />
                  <CardExpiryElement
                    type="text"
                    placeholder="Card Expiry"
                    className="input"
                  />
                  <CardCvcElement
                    type="text"
                    placeholder="CVV"
                    className="input"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn transition"
                disabled={!stripe}
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
                {cartItem.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}

                {/* Add more products here */}

                {/* Totals */}
                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>₹{totalValue}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>₹10.00</p>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>₹{totalValue + 10}</p>
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
