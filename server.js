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

app.use(cors());

app.use(express.json());


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