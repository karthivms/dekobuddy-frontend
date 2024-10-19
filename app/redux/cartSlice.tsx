import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cartItem } from '../types/types';
import { apiRequest } from '../api/apiConfig';



interface initialState {
    cartItems: cartItem[]
    status: "loading" | "success" | "failure",
    error: undefined
}


interface cartdata {
    data: {
        quantity: number,
        user_id: number
    }
    productid: number
}

export const fetchCartItems = createAsyncThunk<cartItem[], string, { rejectValue: string }>(
    "cart/fetchitems",
    async (id, { rejectWithValue }) => {
        if (id) {
            try {
                const response = await apiRequest('GET', `http://localhost:3000/api/cart/${id}`);
                console.log(response)
                return response.data[0].product_items;
            } catch (error) {
                console.log(error)
                return rejectWithValue('Failed to fetch wishlist items');

            }
        }
        return [];
    })


    export const AddCartItems = createAsyncThunk<cartItem[], cartdata, { rejectValue: string }>(
        "cart/additems",
        async (cartdata, { rejectWithValue }) => {
            if (cartdata.data.user_id) {
                try {
                    const response = await apiRequest('POST', `http://localhost:3000/api/cart/addtocart`, cartdata);
                    console.log(response)
                    return response
                } catch (error) {
                    console.log(error)
                    return rejectWithValue('Failed to add cart items');
    
                }
            }
            return [];
        })

const initialState: initialState = {
    cartItems: [],
    status: "loading",
    error: undefined
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

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

export default cartSlice.reducer;
