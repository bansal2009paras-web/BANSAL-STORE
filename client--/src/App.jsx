import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Login from "./pages/login";
import Checkout from "./pages/checkout";
import { useAuth } from "./context/AuthContext";
import Orders from "./pages/orders";
const categories = [
  "All Products",
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Sports"
];

function App() {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const { user, logout } = useAuth();
const [showLogin, setShowLogin] = useState(false);
const [ordersRefreshKey, setOrdersRefreshKey] = useState(0);
const [showCheckout, setShowCheckout] = useState(false);
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Products");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All Products" || product.category === category;

    return matchesSearch && matchesCategory;
  });

function addToCart(product) {
  setCart((previous) => {
    const existingProduct = previous.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      return previous.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...previous, { ...product, quantity: 1 }];
  });
}

function updateQuantity(id, change) {
  setCart((previous) =>
    previous
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + change }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}

  function toggleWishlist(id) {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    showLogin ? (
      <div className="store">
        <header className="navbar">
          <a href="#home" className="logo">
            BANSAL<span>STORE.</span>
          </a>
          <button
            className="account-button"
            onClick={() => setShowLogin(false)}
          >
            Back to Store
          </button>
        </header>

        <Login />
      </div>
    ) : (
    <div className="store">

      <div className="announcement">
        FREE DELIVERY ON ORDERS ABOVE ₹999
      </div>

      <header className="navbar">
        <a href="#home" className="logo">
          BANSAL<span>STORE.</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#products">Shop</a>
          <a href="#footer">About</a>
          <a href="#orders">My Orders</a>
        </nav>

        <div className="nav-actions">
          {user ? (
  <button
    className="account-button"
    onClick={logout}
  >
    {user.name} | Logout
  </button>
) : (
  <button
    className="account-button"
    onClick={() => setShowLogin(true)}
  >
    Login / Register
  </button>
)}
          <a href="#products" className="nav-icon" aria-label="Wishlist">
            <svg viewBox="0 0 24 24">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
            </svg>
            <span>{wishlist.length}</span>
          </a>

          <a href="#cart" className="nav-icon" aria-label="Shopping cart">
            <svg viewBox="0 0 24 24">
              <path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6" />
              <circle cx="10" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
            </svg>
            <span>{cartCount}</span>
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">WELCOME TO BANSAL STORE</span>

            <h1>
              Everything you need.
              <span> All in one place.</span>
            </h1>

            <p>
              Discover premium products across electronics,
              fashion, lifestyle and more. Enjoy quality shopping
              at prices you'll love.
            </p>

            <a href="#products" className="primary-button">
              Explore Products
            </a>

            <div className="hero-features">
              <span>Secure Shopping</span>
              <span>Quality Products</span>
              <span>Great Prices</span>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1000"
              alt="Online shopping collection"
            />
          </div>
        </section>

        <section className="categories-section" id="categories">
          <div className="section-heading">
            <div>
              <span className="eyebrow">EXPLORE OUR COLLECTION</span>
              <h2>Shop by Category</h2>
            </div>
          </div>

          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading product-heading">
            <div>
              <span className="eyebrow">HANDPICKED FOR YOU</span>
              <h2>Featured Products</h2>
            </div>

            <input
              type="search"
              className="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product._id}>
                <button
                  className={
                    wishlist.includes(product._id)
                      ? "wishlist-button selected"
                      : "wishlist-button"
                  }
                  onClick={() => toggleWishlist(product._id)}
                  aria-label="Toggle wishlist"
                >
                  {wishlist.includes(product._id) ? "♥" : "♡"}
                </button>

                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="product-info">
                  <span className="product-category">
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <div className="rating">
                    <span>★</span> {product.rating}
                  </div>

                  <div className="price-row">
                    <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                    <del>
                      ₹{(product.oldPrice??product.price).toLocaleString("en-IN")}
                    </del>
                  </div>

                  <button
                    className="add-button"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="empty-message">
              No products found. Try another search.
            </p>
          )}
        </section>

        <section className="cart-section" id="cart">
          <div className="cart-heading">
            <div>
              <span className="eyebrow">YOUR SHOPPING BAG</span>
              <h2>Shopping Cart</h2>
            </div>

            <button
              className="clear-button"
              onClick={() => setCart([])}
              disabled={cart.length === 0}
            >
              Clear Cart
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="empty-cart">Your shopping cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>₹{item.price.toLocaleString("en-IN")}</p>
                  </div>

                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item._id, -1)}>
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => updateQuantity(item._id, 1)}>
                      +
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-total">
                <span>Total Amount</span>
                <strong>₹{cartTotal.toLocaleString("en-IN")}</strong>
              </div>
              <button  
              className="add-button"
              onClick={() => setShowCheckout(true)}
              disabled={cart.length === 0}
              >
                Proceed to Checkout
                </button>

            </>
          )}
          {showCheckout && (
  <Checkout
    cart={cart}
    onOrderSuccess={() => {
      setCart([]);
      setShowCheckout(false);
      setShowRefreshKey(prev=>prev+1);
    }}
  />
)}

        </section>
        <section id="orders">
          <Orders refreshKey={ordersRefreshKey}/>
        </section>
          
      </main>
      <footer id="footer">
        <a href="#home" className="logo footer-logo">
          BANSAL<span>STORE.</span>
        </a>

        <p>Shop Smart. Live Better.</p>
        <p>© 2026 Bansal Store. All rights reserved.</p>
      </footer>

    </div>
  ));
}

export default App;
