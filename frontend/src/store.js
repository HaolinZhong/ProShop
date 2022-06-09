import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension";
import { productCreateReducer, productDeleteReducer, productDetailReducer, productListReducer, productUpdateReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { adminUpdateProfileReducer, userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./reducers/userReducers";
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListAdminReducer, orderListReducer, orderPayReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: adminUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderList: orderListReducer,
    orderListAdmin: orderListAdminReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: {cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
    userLogin: {userInfo: userInfoFromStorage},
    userDetails: {user: {}}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store