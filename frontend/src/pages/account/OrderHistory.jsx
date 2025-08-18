import React, { useEffect, useState } from "react";
import { useShop } from "../../context/ShopContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const { getMyOrders } = useShop();
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    (async () => {
      const res = await getMyOrders();
      setOrders(res);
    })();
  }, [getMyOrders, user]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  console.log(orders);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.map((order) => (
        <Link to={`/account/order/${order._id}`}
          key={order._id}
          className="rounded-md shadow-md p-4 relative group bg-card mb-4 cursor-pointer flex flex-col"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold">Order #{order._id}</p>
              <p className="text-sm text-gray-500">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <div>
              <p className="font-bold">Total: ${order.totalPrice}</p>
              <p className="text-sm text-gray-500">
                Status: {order.orderStatus}
              </p>
            </div>
          </div>
          
        </Link>
      ))}
    </div>
  );
};

export default OrderHistory;
