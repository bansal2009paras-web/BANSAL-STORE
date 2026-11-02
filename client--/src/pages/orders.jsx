
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Orders({ refreshKey }) {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://bansal-store.onrender.com/api/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setOrders(response.data);
      } catch (err) {
        console.error("Fetch orders error:", err);
        setError("Unable to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, refreshKey]);

  if (loading) return <p>Loading orders...</p>;

  if (!token) {
    return <p>Please login to view your orders.</p>;
  }

  if (error) return <p>{error}</p>;

  return (
    <section className="orders-page">
      <span className="eyebrow">YOUR PURCHASES</span>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <article className="order-card" key={order._id}>
            <div className="order-header">
              <div>
                <h3>Order #{order._id.slice(-8)}</h3>
                <p>
                  {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>

              <span className="order-status">{order.status}</span>
            </div>

            {order.items.map((item, index) => (
              <div className="order-product" key={`${order._id}-${index}`}>
                <img src={item.image} alt={item.name} />

                <div>
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))}

            <div className="order-total">
              Total: ₹{Number(order.totalAmount).toLocaleString("en-IN")}
            </div>
          </article>
        ))
      )}
    </section>
  );
}

export default Orders;
