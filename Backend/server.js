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
// const PORT = process.env.PORT || 5000;
const PORT = 5000


//middlewares
app.use(express.json());
app.use(cookieParser());
connect();

app.use(cors());


app.get('/', (req, res) => {
	res.send('Hello World!');
  });
  



app.use("/cart", cartRoutes);
app.use("/auth", userRoutes);
app.use("/profile", profileRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/v1`);
});
module.exports = app