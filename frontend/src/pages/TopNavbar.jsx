import { useState } from "react";
import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./../styles/TopNavbar.css";

const TopNavbar = ({ firstName }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="top-navbar">
      {/* Left: Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/logo.png" alt="logo" className="logo-img" />
        <h1>BEAU VIE</h1>
      </div>

      {/* Right: Search and Profile */}
      <div className="top-right">
        <input type="text" className="search-bar" placeholder="Search..." />

        <div
          className="profile"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <FaUser />
          <span>{firstName}</span>
          {showDropdown && (
            <div className="dropdown">
              <p onClick={() => navigate("/profile")}>Profile</p>
              <p onClick={() => navigate("/cart")}>Cart</p>
              <p onClick={() => navigate("/wishlist")}>Wishlist</p>
              <p onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}>Logout</p>
            </div>
          )}
        </div>

        <FaHeart className="icon" onClick={() => navigate("/wishlist")} />
        <FaShoppingCart className="icon" onClick={() => navigate("/cart")} />
      </div>
    </div>
  );
};

export default TopNavbar;
