import React, { useState, useEffect } from "react";
import { useShop } from "../../context/ShopContext";
import { useParams } from "react-router-dom";
import { IMAGE_PATH } from "../../utils/constants";

export const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { getOrderDetails } = useShop();

  useEffect(() => {
    (async () => {
      const orderDetails = await getOrderDetails(id);
      setOrder(orderDetails);
    })();
  }, [id]);
  console.log(order);
  if (!order) return <p>Loading...</p>;
  return (
    <div className="mx-auto">
      <h2 className="font-semibold mb-2 text-lg">Order: #{order[0]._id}</h2>
      <div className="rounded-md shadow-md p-4 relative group bg-light mb-4">
        <div className="flex justify-between items-center gap-4 text-sm">
          <div>
            <p>
              <span className="font-medium">Order ID:</span> {order[0]._id}
            </p>

            <p>
              <span className="font-medium">Status:</span>
              <span className="ml-1 px-2 py-0.5 rounded text-xs bg-green-100 text-green-700">
                {order[0].orderStatus}
              </span>
            </p>
          </div>
          <div>
            <p className="font-bold">Total Paid: ₹{order[0].totalPrice}</p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {order[0].createdAt.split("T")[0]}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="rounded-md shadow-md p-4 relative group bg-light">
          <h3 className="font-semibold text-base mb-2">Shipping Info</h3>
          <p className="text-sm">{order[0].shippingInfo.address}</p>
          <p className="text-sm">
            {order[0].shippingInfo.state}, {order[0].shippingInfo.country} -{" "}
            {order[0].shippingInfo.pincode}
          </p>
          <p className="text-sm">Phone: {order[0].shippingInfo.phoneNumber}</p>
        </div>

        <div className="rounded-md shadow-md p-4 relative group bg-light">
          <h3 className="font-semibold text-base mb-2">Payment</h3>
          <div className="text-sm space-y-1">
            <p>
              <span className="font-medium">ID:</span> {order[0].paymentInfo.id}
            </p>
            <p>
              <span className="font-medium">Method:</span> Credit Card
            </p>
            <p>
              <span className="font-medium">Status:</span>
              <span className="ml-1 px-2 py-0.5 rounded text-xs">
                {order[0].paymentInfo.status ? (
                  <span className="bg-green-100 text-green-700">Success</span>
                ) : (
                  <span className="bg-red-100 text-red-700">Failed</span>
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
      {order[0].orderedItems.length > 0 && (
      <div className="rounded-md shadow-md p-4 relative group bg-light mb-4">
        <h3 className="font-semibold text-base mb-2">Order Items</h3>
        {order[0].orderedItems.map((item) => (
          <div key={item._id} className="flex items-center justify-between text-sm not-[&:last-child]:border-b border-primary/20 pb-2 mb-2">
            <div className="flex items-center gap-3">
              <img
                src={`${IMAGE_PATH}/${item.image}`}
                alt="iPhone"
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600">
                  {item.quantity} × ₹{item.price}
                </p>
              </div>
            </div>
            <p className="font-semibold">₹{item.quantity * item.price}</p>
          </div>
        ))}
      </div>
      )}

      <div className="flex flex-col items-end min-w-2xs">
        <div className="flex justify-between items-center w-full gap-10 max-w-2xs mb-2">
          <p>Shipping Charges</p>
          <p className="">₹{order[0].shippingPrice}</p>
        </div>
        <div className="flex justify-between items-center w-full gap-10 max-w-2xs">
          <p className="font-semibold text-base">Total Price</p>
          <p className="font-bold">₹{order[0].totalPrice}</p>
        </div>
      </div>
    </div>
  );
};
