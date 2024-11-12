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


interface OrderResponse {
    success: boolean,
    order_id: string

}

interface dataType {
    coupon: string,
    userid: string
}

interface initialState {
    addresses: address[]
    orderPlaced: boolean,
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
    orderPlaced: false,
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
        rejectWithValue('')
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


export const placeOrder = createAsyncThunk<OrderResponse, Number, { rejectValue: string }>('/checkout/placeorder', async (id, { rejectWithValue, getState }) => {
    try {
        const state = getState() as RootState;
        const address = state.checkout.selectedAddress
        const body = {
            user_id: id,
            cartItems: state.cart.cartItems.map((item) => ({
                id: item.product.id,
                quantity: item.product.quantity,
                total_amount: `${item.product.quantity * item.product.regular_price}`
            }
            )),
            billing_info: {
                first_name: address.first_name,
                address_1: address.address_1,
                city: address.city,
                postcode: address.postcode,
                Country_Region: address.Country_Region,
                state_country: address.state_country,
                email: address.email,
                phone: address.phone,
                alternative_phone: address.alternative_phone,
                landmark: address.landmark
            },
            total_amount: `${state.cart.total}`,
            tax_amount: "0.00",
            amount: state.checkout.discounted_total !== '' ? `${state.checkout.discounted_total}` : `${state.cart.total}`,
            shipping_cost: "0.00",
            discount: state.checkout.discount_amount === '' ? '0' : `${state.checkout.discount_amount}`,
            coupon_code: state.checkout.coupon_code !== '' ? state.checkout.coupon_code : ''

        }

        const response = await apiRequest(
            'POST', `${state.cart.url}/api/placeOrder`,
            body,
        );
        if (response.error) {
            console.log(response.error)
            return response.error
        }
        console.log(response.data)
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
            console.log(selected)
            if (selected) {
                state.selectedAddress = selected;
            }
        },
        removeCoupon: (state) => {
            state.coupon_code = "";
            state.discounted_total = "";
            state.discount_amount = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAddress.fulfilled, (state, action) => {
            state.addresses = action.payload;
            if (!state.selectedAddress || state.selectedAddress.id === 0) {
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


        })
        builder.addCase(ApplyCoupon.pending, (state) => {
            state.couponStatus = 'loading';
        })
        builder.addCase(ApplyCoupon.rejected, (state) => {
            state.couponStatus = 'failure';
            state.error = ""
        })
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            if (action.payload.success) {
                state.orderPlaced = true
            }
        })
    }
})

export const { changeStep, updateSelectedAddress, removeCoupon } = cartSlice.actions;

export default cartSlice.reducer;
