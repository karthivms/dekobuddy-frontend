import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { address } from '../types/types';
import { apiRequest } from '../api/apiConfig';
import { RootState } from './store';

interface couponResponse {
    discounted_total?: string,
    discount_amount?: string,
    coupon_code?: string,
    error?: string

}

interface dataType {
    coupon: string,
    userid: string
}

interface initialState {
    addresses: address[]
    status: "loading" | "success" | "failure",
    couponStatus: "loading" | "success" | "failure",
    selectedAddress: {
        id: number,
        address_type: string,
        first_name: string,
        address_1: string,
        city: string,
        landmark: null | string,
        postcode: string,
        Country_Region: string,
        state_country: string,
        email: string,
        phone: string,
        alternative_phone: null | string,
        user: number
    },
    error: undefined | string,
    discounted_total: string,
    discount_amount: string,
    coupon_code: string,
    activeStep: number
}

const initialState: initialState = {
    addresses: [],
    status: "loading",
    couponStatus: "success",
    selectedAddress: {
        id: 0,
        address_type: "Billing",
        first_name: "",
        address_1: "",
        city: "",
        landmark: null,
        postcode: "",
        Country_Region: "",
        state_country: "",
        email: "",
        phone: "",
        alternative_phone: null,
        user: 0
    },
    activeStep: 3,
    discounted_total: '',
    discount_amount: '',
    coupon_code: '',
    error: undefined
}


export const fetchAddress = createAsyncThunk<address[], number, { rejectValue: string }>('/checkout/fetchAddress', async (id, { rejectWithValue, getState }) => {
    try {
        const state = getState() as RootState;
        const response = await apiRequest(
            'GET', `${state.cart.url}/api/address`,
            null,
            {
                id: id
            });

        return response.data;

    } catch (error) {
        console.log(error);
        return [];
    }
})

export const ApplyCoupon = createAsyncThunk<couponResponse, dataType, { rejectValue: string }>('/checkout/applycoupon', async (data, { rejectWithValue, getState }) => {
    try {
        const state = getState() as RootState;
        const body = {
            coupon_code: data.coupon,
            cart_total: state.cart.total,
            ship_cost: 0.00,
            cart_items: state.cart.cartItems.map((item) => ({
                id: item.id,
                quantity: item.product.quantity,
                name: item.product.name,
                total: item.product.quantity * item.product.regular_price
            }
            )),
            user: data.userid

        }

        const response = await apiRequest(
            'POST', `${state.cart.url}/api/coupon`,
            body,
        );
        if (response.error) {
            console.log(response.error)
            return response.error
        } 
        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue('')
    }
})


const cartSlice = createSlice({
    name: "Checkout",
    initialState,
    reducers: {
        changeStep: (state, action) => {
            state.activeStep = action.payload
        },
        updateSelectedAddress: (state, action) => {
            const selected = state.addresses.find((item) => item.id === action.payload);
            if (selected) {
                state.selectedAddress = selected;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAddress.fulfilled, (state, action) => {
            state.addresses = action.payload;
            if (state.selectedAddress.id === 0) {
                state.selectedAddress = action.payload[0];
            }
            state.status = "success"
        })
        builder.addCase(ApplyCoupon.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.error = action.payload.error;
                state.couponStatus = 'success';
            }

            if (action.payload.discounted_total && action.payload.discount_amount && action.payload.coupon_code) {
                state.discounted_total = action.payload.discounted_total;
                state.discount_amount = action.payload.discount_amount;
                state.coupon_code = action.payload.coupon_code;
                state.error = '';
                state.couponStatus = 'success';

            }

            state.discounted_total = '10000';
            state.discount_amount = '2000';
            state.coupon_code = 'Deko10';
        })
        builder.addCase(ApplyCoupon.pending, (state) => {
            state.couponStatus = 'loading';
        })
        builder.addCase(ApplyCoupon.rejected, (state) => {
            state.couponStatus = 'failure';
            state.error = ""
        })
    }
})

export const { changeStep, updateSelectedAddress } = cartSlice.actions;

export default cartSlice.reducer;
