import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { address, cartItem } from '../types/types';
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
    buy_now: cartItem[],
    buy_total: number,
    status: "loading" | "success" | "failure",
    couponStatus: "loading" | "success" | "failure",
    orderStatus: "loading" | "success" | "failure",
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
    placed_order_id: string
}

const initialState: initialState = {
    addresses: [],
    orderPlaced: false,
    status: "loading",
    buy_now: [],
    buy_total: 0,
    couponStatus: "success",
    orderStatus: "success",
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
    activeStep: 1,
    discounted_total: '',
    discount_amount: '',
    coupon_code: '',
    error: undefined,
    placed_order_id: ''
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
        let body = {}
        if (state.checkout.buy_now.length !== 0) {
            body = {
                coupon_code: data.coupon,
                cart_total: state.checkout.buy_total,
                ship_cost: 0.00,
                cart_items: state.checkout.buy_now.map((item) => ({
                    id: item.id,
                    quantity: item.product.quantity,
                    name: item.product.name,
                    total: item.product.quantity * item.product.regular_price
                }
                )),
                user: data.userid

            }
        } else {
            body = {
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
        }

        console.log(body)

        const response = await apiRequest(
            'POST', `${state.cart.url}/api/coupon`,
            body,
        );
        console.log(response)
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


export const placeOrder = createAsyncThunk<OrderResponse, number, { rejectValue: string }>('/checkout/placeorder', async (id, { rejectWithValue, getState }) => {
    try {
        const state = getState() as RootState;
        const address = state.checkout.selectedAddress
        let body = {}
        if (state.checkout.buy_now.length === 0) {
            body = {
                user_id: id,
                cartItems: state.cart.cartItems.map((item) => ({
                    cart_item_id: item.id,
                    quantity: item.product.quantity,
                }
                )),
                billing_info: {
                    address_id: address.id,
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
                tax_amount: "0.00",
                amount: state.cart.total,
                shipping_cost: "0.00",
                coupon_code: state.checkout.coupon_code !== '' ? state.checkout.coupon_code : ''

            }
        } else {
            body = {
                user_id: id,
                buy_now_data: {
                    variation_id: state.checkout.buy_now[0].product.id,
                    quantity: state.checkout.buy_now[0].product.quantity,
                }
                ,
                billing_info: {
                    address_id: address.id,
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
                amount: state.checkout.buy_total,
                tax_amount: "0.00",
                shipping_cost: "0.00",
                coupon_code: state.checkout.coupon_code !== '' ? state.checkout.coupon_code : ''
            }

        }

        const response = await apiRequest(
            'POST', `${state.cart.url}/api/placeOrder`,
            body,
        );
        if (response.error) {
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
            console.log(selected)
            if (selected) {
                state.selectedAddress = selected;
            }
        },
        AddtoBuy: (state, { payload }) => {

            state.buy_now = [];
            state.coupon_code = "";
            state.discounted_total = "";
            state.discount_amount = "";
            const item = {
                id: payload.id,
                product: payload.product,
            }


            state.buy_now.push(item);

        },

        removeBuyItem: (state, { payload }) => {
            const removeItem = state.buy_now.filter((item) => item.id !== payload);
            state.buy_now = removeItem;
        },
        incrementBuyQuantity: (state, { payload }) => {
            const isItem = state.buy_now.find((item) => item.id === payload);

            if (isItem) {
                isItem.product.quantity++;
            }

        },
        decrementBuyQuantity: (state, { payload }) => {
            const isItem = state.buy_now.find((item) => item.id === payload);

            if (isItem) {
                if (isItem.product.quantity === 1) {
                    isItem.product.quantity = 1
                } else {
                    isItem.product.quantity--;
                }
            }
        },
        getBuytotal: (state) => {

            let total = 0;

            state.buy_now.forEach((item) => {

                total = total + item.product.quantity * Number(item.product.regular_price);
            })

            state.buy_total = total;
        },
        removeCoupon: (state) => {
            state.coupon_code = "";
            state.discounted_total = "";
            state.discount_amount = "";
        },
        changeStatus: (state) => {
            state.orderPlaced = false;
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
            .addCase(ApplyCoupon.fulfilled, (state, action) => {
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
            .addCase(ApplyCoupon.pending, (state) => {
                state.couponStatus = 'loading';
            })
            .addCase(ApplyCoupon.rejected, (state) => {
                state.couponStatus = 'failure';
                state.error = ""
            })
            .addCase(placeOrder.pending, (state) => {
                state.orderStatus = 'loading'
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.buy_now = [];
                if (action.payload.success) {
                    state.placed_order_id = action.payload.order_id
                    state.orderPlaced = true
                    state.orderStatus = 'success';
                    state.discounted_total = "";
                    state.discount_amount ="";
                    state.coupon_code = "";
                }
            })
    }
})

export const { changeStep, updateSelectedAddress, removeCoupon, changeStatus, AddtoBuy, removeBuyItem, incrementBuyQuantity, decrementBuyQuantity, getBuytotal } = cartSlice.actions;

export default cartSlice.reducer;
