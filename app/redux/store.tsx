import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import wishlistReducer from "./wishlistslice";
import filterReducer from "./Filterslice";
import checkoutReducer from "./checkoutslice";
import reviewReducer from "./reviewSlice";


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist : wishlistReducer,
        product : filterReducer,
        checkout : checkoutReducer,
        reviews : reviewReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;