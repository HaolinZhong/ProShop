import expressAsyncHandler from "express-async-handler";
import Product from "../model/product.js";


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = expressAsyncHandler(async (req, res) => {
    const pageSize = 4
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.count({ ...keyword })
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
})


// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  Public
const getProductById = expressAsyncHandler(async (req, res) => {
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
const deleteProduct = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove()
        res.json({ message: 'Product removed' });
    } else {
        res.status(404)
        throw new Error('product not found')
    }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201)
    res.json(createdProduct)
})




// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = expressAsyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updateProduct = await product.save()
        res.json(updateProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = expressAsyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {

        // Check if the user has bought the product
        const orders = await Order.find({ user: req.user._id })

        const ordersItems = [].concat.apply(
            [],
            orders.map(order => order.orderItems.map(item => item.product.toString()))
        )

        const hasBought = ordersItems.includes(product._id.toString())

        if (!hasBought) {
            res.status(400)
            throw new Error('You can only review products you bought')
        }

        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })

    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})



// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    res.json(products)
})


export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
}
