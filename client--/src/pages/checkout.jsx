import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Checkout({ cart, onOrderSuccess }) {
  const { token } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function placeOrder(event) {
    event.preventDefault();

    if (!token) {
      setMessage("Please login before placing an order.");
      return;
    }

    if (cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cart.map((item) => ({
            product: item._id,
            quantity: item.quantity
          })),
          shippingAddress: form
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("Order placed successfully!");
      onOrderSuccess();

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to place order."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="checkout-section" id="checkout">
      <span className="eyebrow">ALMOST THERE</span>
      <h2>Checkout</h2>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder}>
          <h3>Delivery Information</h3>

          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            type="tel"
            pattern="[0-9]{10}"
            maxLength="10"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />

          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
          />

          <input
            name="pincode"
            placeholder="PIN Code"
            pattern="[0-9]{6}"
            maxLength="6"
            value={form.pincode}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="add-button"
            disabled={loading || cart.length === 0}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          {message && <p>{message}</p>}
        </form>

        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div className="summary-item" key={item._id}>
              <span>{item.name} × {item.quantity}</span>
              <strong>
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </strong>
            </div>
          ))}

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;