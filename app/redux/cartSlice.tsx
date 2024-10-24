import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cartdata, cartItem } from '../types/types';
import { apiRequest } from '../api/apiConfig';
import { RootState } from './store';


interface initialState {
    cartItems: cartItem[]
    status: "loading" | "success" | "failure",
    error: undefined
    total: number
}

export const fetchCartItems = createAsyncThunk<cartItem[], string, { rejectValue: string }>(
    "cart/fetchitems",
    async (id, { rejectWithValue }) => {
        if (id) {
            try {
                const response = await apiRequest('GET', `http://localhost:3000/api/cart/${id}`);
                localStorage.removeItem('cart')
                return response.data[0].product_items;
            } catch (error) {
                console.log(error);
                return rejectWithValue('Failed to fetch cart items');

            }
        } else {
            const data = localStorage.getItem("cart");
            return data ? JSON.parse(data) : [];
        }
        return [];

    })


export const AddCartItems = createAsyncThunk<cartItem[], cartdata, { rejectValue: string }>(
    "cart/additems",
    async (cartdata, { rejectWithValue, getState }) => {

        if (cartdata.user_id) {
            try {
                const response = await apiRequest('POST', `http://localhost:3000/api/cart/addtocart`, cartdata);
                return response;
            } catch (error) {
                console.log(error);
                return rejectWithValue('Failed to add cart items');
            }
        } else {
            const state = getState() as RootState;
            localStorage.setItem("cart", JSON.stringify(state.cart.cartItems));
        }
    })

const initialState: initialState = {
    cartItems: [],
    status: "loading",
    error: undefined,
    total: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddtoCart: (state, { payload }) => {

            const isItem = state.cartItems.find((item) => item.products.id === payload.products.id);

            const item = {
                id: payload.id,
                products: payload.products,
                quantity: payload.quantity
            }

            if (isItem) {
                isItem.quantity++;
            } else {
                state.cartItems.push(item);
            }
        },

        removeCartItem: (state, { payload }) => {
            const removeItem = state.cartItems.filter((item) => item.id !== payload);
            state.cartItems = removeItem;
        },
        incrementQuantity: (state, { payload }) => {
            const isItem = state.cartItems.find((item) => item.products.id === payload);

            if (isItem) {
                isItem.quantity++;
            }

        },
        decrementQuantity: (state, { payload }) => {
            const isItem = state.cartItems.find((item) => item.products.id === payload);

            if (isItem) {
                if (isItem.quantity === 1) {
                    isItem.quantity = 1
                } else {
                    isItem.quantity--;
                }
            }
        },
        gettotal: (state) => {

            let total = 0;

            state.cartItems.forEach((item) => {

                total = total + item.quantity * Number(item.products.regular_price);
            })

            state.total = total;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCartItems.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.status = "success";
            state.cartItems = action.payload;
        });
        builder.addCase(fetchCartItems.rejected, (state) => {
            state.status = "failure";
        })
    }
})

export const { AddtoCart, gettotal, removeCartItem, incrementQuantity, decrementQuantity } = cartSlice.actions
export default cartSlice.reducer;
