import { useEffect, useState } from "react";
import axios from "../api/axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

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

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome to Our Store!</h2>

      <div>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((p) => (
            <div key={p.id}>
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>

              <img
                src={`/uploads/products/${p.image}`}

                alt={p.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '10px'
                  }}
              />

              
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: "1rem" }}>
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
