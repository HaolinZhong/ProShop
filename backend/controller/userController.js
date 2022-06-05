import expressAsyncHandler from "express-async-handler";
import User from "../model/user.js"

// @desc    User authentification
// @route   POST /api/users/login
// @access  Private
const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

export { authUser }