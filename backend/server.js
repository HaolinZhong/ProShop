import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import productRoute from "./route/productRoutes.js"
import userRoute from "./route/userRoutes.js"
import orderRoute from "./route/orderRoutes.js"
import uploadRoute from "./route/uploadRoutes.js"
import {notFound, errorHandler} from "./middleware/errorMiddleware.js"
import path from 'path'

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json());

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);

app.get('/api/config/paypal', (req, res) => (
    res.send(process.env.PAYPAL_CLIENT_ID)
))

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, '/uploads')))

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("API is running");
})


const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server started on port ${port} in ${process.env.NODE_ENV} mode!`));

