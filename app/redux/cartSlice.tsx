
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cartdata, cartItem } from '../types/types';
import { apiRequest } from '../api/apiConfig';
import { RootState } from './store';
import { getDomainUrl } from '../utilis/getDomain';


interface initialState {
    cartItems: cartItem[]
    status: "loading" | "success" | "failure",
    error: undefined
    total: number
    url: string
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

interface addResponse {
    success: boolean,
    cart_data: {
        cart_item_id: number
    }
}


export const fetchCartItems = createAsyncThunk<cartItem[], string, { rejectValue: string }>(
    "cart/fetchitems",
    async (id, { rejectWithValue, getState }) => {
        if (id) {
            try {
                const state = getState() as RootState
                const response = await apiRequest('GET', `${state.cart.url}/api/cart/${id}`);
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


export const AddCartItems = createAsyncThunk<addResponse, cartdata, { rejectValue: string }>(
    "cart/additems",
    async (cartdata, { rejectWithValue, getState }) => {
        console.log(cartdata)

        if (cartdata.user_id) {
            try {
                const state = getState() as RootState
                const response = await apiRequest('POST', `${state.cart.url}/api/cart/addtocart`, cartdata);
                return response.data;
            } catch (error) {
                console.log(error);
                return rejectWithValue('Failed to add cart items');
            }
        } else {
            const state = getState() as RootState;
            localStorage.setItem("cart", JSON.stringify(state.cart.cartItems));
            const isFirstitem = state.cart.cartItems.length === 1
            console.log(isFirstitem)
            return { success: true, cart_data: { cart_item_id: isFirstitem ? 1 : state.cart.cartItems[state.cart.cartItems.length - 1].id } }
        }
    })


export const UpdateQuantity = createAsyncThunk<cartItem[], updateBody, { rejectValue: string }>(
    "cart/updateitems",
    async (cartdata, { rejectWithValue, getState }) => {

        if (cartdata.user_id) {
            try {
                const state = getState() as RootState
                const response = await apiRequest('PUT', `${state.cart.url}/api/cart/updatecart`, cartdata);
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
                const state = getState() as RootState
                const response = await apiRequest('DELETE', `${state.cart.url}/api/cart/deletecart`, cartdata);
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
    total: 0,
    url: ''
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
            }

            if (isItem) {
                isItem.product.quantity = isItem.product.quantity + payload.product.quantity;
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
        },
        updateUrl: (state) => {
            const { url } = getDomainUrl();
            state.url = url;
        },
        clearCart: (state) => {
            state.cartItems = [];
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
        });
        builder.addCase(AddCartItems.fulfilled, (state, action) => {
            const isProduct = state.cartItems.some((item) => item.id === action.payload.cart_data.cart_item_id)
            if (!isProduct) {
                state.cartItems[state.cartItems.length - 1].id = action.payload.cart_data.cart_item_id;
            }

        })
    }
})

export const { AddtoCart, gettotal, removeCartItem, incrementQuantity, decrementQuantity, updateUrl, clearCart } = cartSlice.actions
export default cartSlice.reducer;
