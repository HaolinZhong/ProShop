import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from '../model/user.js'

const protect = expressAsyncHandler(async (req, res, next) => {
    let token
    const authText = req.headers.authorization
    if (authText && authText.startsWith('Bearer')) {
        try {
            token = authText.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized. Token failed')
        }
    }
    
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized admin')
    }
}

export { protect, admin }