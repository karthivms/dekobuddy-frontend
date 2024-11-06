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

interface updateBody {
    cart_id: number,
    quantity: number,
    user_id: number
}

interface deletebody {
    cart_id: number,
    user_id: number
}

export const fetchCartItems = createAsyncThunk<cartItem[], string, { rejectValue: string }>(
    "cart/fetchitems",
    async (id, { rejectWithValue }) => {
        if (id) {
            try {
                const response = await apiRequest('GET', `http://localhost:3000/api/cart/${id}`);
                localStorage.removeItem('cart');
                if (response.data.length > 0) {
                    return response.data[0];
                } else {
                    return response.data;
                }
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


export const UpdateQuantity = createAsyncThunk<cartItem[], updateBody, { rejectValue: string }>(
    "cart/updateitems",
    async (cartdata, { rejectWithValue, getState }) => {

        if (cartdata.user_id) {
            try {
                const response = await apiRequest('PUT', `http://localhost:3000/api/cart/updatecart`, cartdata);
                return response;
            } catch (error) {
                console.log(error);
                return rejectWithValue('Failed to update cart items');
            }
        } else {
            const state = getState() as RootState;
            localStorage.setItem("cart", JSON.stringify(state.cart.cartItems));
        }
    })


export const DeleteCartItem = createAsyncThunk<cartItem[], deletebody, { rejectValue: string }>(
    "cart/deleteitems",
    async (cartdata, { rejectWithValue, getState }) => {

        if (cartdata.user_id) {
            try {
                const response = await apiRequest('DELETE', `http://localhost:3000/api/cart/deletecart`, cartdata);
                return response;
            } catch (error) {
                console.log(error);
                return rejectWithValue('Failed to delete cart item');
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

            const isItem = state.cartItems.find((item) => item.product.id === payload.product.id);

            const item = {
                id: payload.id,
                product: payload.product,
                quantity: payload.quantity
            }

            if (isItem) {
                isItem.product.quantity++;
            } else {
                state.cartItems.push(item);
            }
        },

        removeCartItem: (state, { payload }) => {
            const removeItem = state.cartItems.filter((item) => item.id !== payload);
            state.cartItems = removeItem;
        },
        incrementQuantity: (state, { payload }) => {
            const isItem = state.cartItems.find((item) => item.id === payload);

            if (isItem) {
                isItem.product.quantity++;
            }

        },
        decrementQuantity: (state, { payload }) => {
            const isItem = state.cartItems.find((item) => item.id === payload);

            if (isItem) {
                if (isItem.product.quantity === 1) {
                    isItem.product.quantity = 1
                } else {
                    isItem.product.quantity--;
                }
            }
        },
        gettotal: (state) => {

            let total = 0;

            state.cartItems.forEach((item) => {

                total = total + item.product.quantity * Number(item.product.regular_price);
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
