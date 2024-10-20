import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../api/apiConfig';
import { Product } from '../types/types';


interface initialState {
    attributes: string[]
    products:Product[]
    status: "loading" | "success" | "failure",
    error: undefined
}

const initialState: initialState = {
    attributes: [],
    products:[],
    status: "loading",
    error: undefined,
}

export const getProducts = createAsyncThunk<Product[],{ rejectValue: string }>(
    "products/getproducts",
    async (_, { rejectWithValue }) => {

        try {
            const response = await apiRequest('GET', `http://localhost:3000/api/products`);
            const data = await response.json();
            return data.data.results;
        } catch (error) {
            console.log(error);
            return rejectWithValue('Failed to get items');
        }

    })




const filterSlice = createSlice({
    name: "Filter",
    initialState,
    reducers: {
        addAttribute: (state, action) => {
            state.attributes.push(action.payload);
        },
        removeAttribute: (state, action) => {
            state.attributes = state.attributes.filter(attr => attr !== action.payload);
        },
        clearAttributes: (state) => {
            state.attributes = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.status = "success";
            state.products = action.payload;
        });
        builder.addCase(getProducts.rejected, (state) => {
            state.status = "failure";
        })
    }
})

export const { addAttribute, removeAttribute, clearAttributes } = filterSlice.actions;


export default filterSlice.reducer;
