import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoute from "./route/productRoutes.js"
import {notFound, errorHandler} from "./middleware/errorMiddleware.js"

dotenv.config();

connectDB();

const app = express();

app.use("/api/products", productRoute);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("API is running");
})


const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server started on port ${port} in ${process.env.NODE_ENV} mode!`));

