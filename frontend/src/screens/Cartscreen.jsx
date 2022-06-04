import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import { addToCart } from '../actions/cartActions'

const Cartscreen = () => {
    const params = useParams()
    const productId = params.id
    const location = useLocation()

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

  return (
    <div>
        <h1>{productId}</h1>
        <h1>{qty}</h1>
    </div>
  )
}

export default Cartscreen