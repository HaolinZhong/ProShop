import expressAsyncHandler from "express-async-handler";
import Product from "../model/product.js";


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products);
})


// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  Public
const getProductById = expressAsyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404)
        throw new Error('product not found')
    }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = expressAsyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove()
        res.json({message: 'Product removed'});
    } else {
        res.status(404)
        throw new Error('product not found')
    }
})

export {getProducts, getProductById, deleteProduct }