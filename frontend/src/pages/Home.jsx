import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const fetchProducts = async (page = 1) => {
    try {
      const res = await axios.get(`/api/products?page=${page}&limit=10`);
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePrev = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  const handleNext = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handleAddToCart = async (product_id) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      await axios.post("/api/cart/add", {
        product_id,
        quantity: 1,
      });
      alert("Added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Please login to continue.");
        navigate("/login");
      } else {
        alert("Failed to add to cart");
      }
    }
  };

  const handleAddToWishlist = async (product_id) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      await axios.post("/api/wishlist", {
        productId: product_id,
      });
      alert("Added to wishlist!");
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      if (err.response?.status === 400) {
        alert("Already in wishlist!");
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Please login to continue.");
        navigate("/login");
      } else {
        alert("Failed to add to wishlist");
      }
    }
  };

  return (
    <div style={{ /*padding: "2rem"*/ paddingTop: '110px' }}>
      {/* <h2>Welcome to Our Store!</h2> */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "1rem",
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>

              <div
                style={{ display: "flex", gap: "0.5rem", marginTop: "10px" }}
              >
                <button onClick={() => handleAddToCart(p.id)}>
                  🛒 Add to Cart
                </button>
                <button onClick={() => handleAddToWishlist(p.id)}>
                  ❤️ Wishlist
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <button onClick={handlePrev} disabled={pagination.currentPage === 1}>
          ⬅ Prev
        </button>
        <span style={{ margin: "0 1rem" }}>
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={pagination.currentPage === pagination.totalPages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Home;
