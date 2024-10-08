import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import wishlistReducer from "./wishlistslice";
import filterReducer from "./Filterslice";
import checkoutReducer from "./checkoutslice";


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist : wishlistReducer,
        attribute : filterReducer,
        checkout : checkoutReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

