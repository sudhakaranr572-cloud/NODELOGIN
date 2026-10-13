const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();


// ===============================
// CHECK ENV
// ===============================

console.log("PORT:", process.env.PORT);
console.log("MongoDB URI exists:", !!process.env.MONGO_URI);
console.log("JWT SECRET exists:", !!process.env.JWT_SECRET);


// ===============================
// DATABASE
// ===============================

connectDB();


// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

app.use(cors({
    origin: "https://register-three-kappa.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


// ===============================
// ROUTES
// ===============================

app.use("/api/auth", authRoutes);


// ===============================
// TEST
// ===============================

app.get("/", (req, res) => {

    res.json({
        message: "Royal MERN Backend is working"
    });

});


// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});