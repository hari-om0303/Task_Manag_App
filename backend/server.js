const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorMiddleware");


dotenv.config();

connectDB(); 

const app = express();

app.use(express.json());
app.use(cookieParser()); 

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});