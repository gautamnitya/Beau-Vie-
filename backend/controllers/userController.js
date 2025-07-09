const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

// REGISTER a new user
exports.register = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    try {
        if (!email || !password || !first_name || !last_name) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const [existingUser] = await db.query("SELECT id FROM users WHERE email = ?", [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await db.query(
            "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)",
            [email, hashedPassword, first_name, last_name]
        );

        const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, { expiresIn: "24h" });

        res.status(201).json({
            token,
            user: {
                id: result.insertId,
                email,
                first_name,
                last_name
            }
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user" });
    }
};

// LOGIN user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const [users] = await db.query(
            "SELECT id, email, password, first_name, last_name, role FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });

        delete user.password;

        res.json({
            token,
            user
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in" });
    }
};
