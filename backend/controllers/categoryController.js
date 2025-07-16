const db = require("../config/database");

exports.getAllCategories = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name FROM categories ORDER BY id");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};
