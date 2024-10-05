const express = require("express");
const app = express();
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const productRoutes = require("./routes/Product");
const cookieParser = require("cookie-parser");
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const cors = require("cors");
const dotenv = require("dotenv");
const { connect } = require("./db/dbconfig");
dotenv.config();
const PORT = process.env.PORT || 5000;


//middlewares
app.use(express.json());
app.use(cookieParser());
connect();

app.use(
	cors({
		origin: "https://ecommerce-website-liard-mu.vercel.app/",
		credentials: true,
	})
);


app.use('/api/v1/cart', cartRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = app