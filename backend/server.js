const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Routes
app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api/products", require("./routes/ProductRoutes"));
app.use('/api/hero-images', require('./routes/heroImages'));
app.use("/uploads", express.static("uploads"));
//app.use("/api/users", require("./routes/auth"));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
