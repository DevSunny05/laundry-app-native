import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/CartReducer";
import ProductReducer from "./redux/ProductReducer";


export default configureStore({
    reducer:{
        cart:CartReducer,
        product:ProductReducer
    }
})