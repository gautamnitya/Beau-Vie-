import { useEffect, useState } from "react";
import axios from "../api/axios";
import "./../styles/BottomCategoryBar.css";

const BottomCategoryBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then(res => setCategories(res.data));
  }, []);

  return (
    <div className="bottom-navbar">
      {categories.map((cat) => (
        <div key={cat.id} className="category-item">
          {cat.name}
        </div>
      ))}
    </div>
  );
};

export default BottomCategoryBar;
