import React, { useEffect, useState } from 'react'
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';

const OrderHistory = () => {
  const { getAllPlacedOrders } = useShop();
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    (async () => {
      const res = await getAllPlacedOrders();
      setOrders(res);
    })();
  }, [getAllPlacedOrders, user]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  console.log(orders);
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.map((order) => (
        <div key={order._id} className="border border-primary/30 p-4 rounded-md mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-bold">Order #{order._id}</p>
              <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
            </div>
            <div>
              <p className="text-lg font-bold">Total: ${order.totalPrice}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-lg font-bold">Items:</p>
            {order.orderedItems.map((item) => (
  <div key={item._id} className="flex justify-between items-center mt-2">
    <div>
      <p className="text-lg font-bold">{item.name}</p>
      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
    </div>
    <div>
      <p className="text-lg font-bold">${item.price}</p>
    </div>
  </div>
))}

          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory