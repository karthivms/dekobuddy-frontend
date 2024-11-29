
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../api/apiConfig';
import { Product } from '../types/types';
import { RootState } from './store';


interface initialState {
    attributes: string[]
    products: Product[]
    status: "loading" | "success" | "failure",
    error: undefined,
    best_sellers : boolean,
    count: number,
    limit: number,
    offset: number,
    sort: string,
    minprice: number,
    maxprice: number,
    currentCategory: string
    currentSubCategory: string

}

const initialState: initialState = {
    attributes: [],
    products: [],
    status: "loading",
    error: undefined,
    best_sellers : false,
    count: 0,
    limit: 20,
    offset: 0,
    sort: '',
    minprice: 0,
    maxprice: 0,
    currentCategory: '',
    currentSubCategory: ''

}

interface APIResponse {
    count: number,
    results: Product[]
}


export const getProducts = createAsyncThunk<APIResponse, string, { rejectValue: string }>(
    "products/getproducts",
    async (category, { rejectWithValue, getState }) => {

        const state = getState() as RootState;
        const limit = state.product.limit;
        const offset = state.product.offset;
        const size = state.product.attributes.join().replace(/\s+/g, '');
        const sort = state.product.sort;
        const min_price = state.product.minprice;
        const max_price = state.product.maxprice;
        const subcategory = state.product.currentSubCategory;
        const bestsellers = state.product.best_sellers;

        try {
            const response = await apiRequest(
                'GET', `${state.cart.url}/api/products`,
                null,
                {
                    category: category,
                    limit: limit,
                    offset: offset,
                    size: size,
                    sort_by: sort,
                    min_price: min_price,
                    max_price: max_price,
                    subcategories__slug : subcategory,
                    ...(bestsellers && { bestsellers: true })

                });
            return response.data;

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
            state.attributes = [];
            state.minprice = 0;
            state.maxprice = 0;
        },
        updateOffset: (state, { payload }) => {
            state.offset = payload;
        },
        updateSort: (state, { payload }) => {
            state.sort = payload;
        },
        updateMinPrice: (state, { payload }) => {
            state.minprice = payload;
        },
        updateMaxPrice: (state, { payload }) => {
            state.maxprice = payload;
        },
        updateCurrentCategory: (state, { payload }) => {
            state.currentCategory = payload;
        },
        updateSubCategory: (state, { payload }) => {
            state.currentSubCategory = payload;
        },
        updateBestsellers: (state, { payload }) => {
            state.best_sellers = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.status = "success";
            state.count = action.payload.count;
            state.products = action.payload.results;
            state.best_sellers = false;
        });
        builder.addCase(getProducts.rejected, (state) => {
            state.status = "failure";
        })
    }
})

export const {
    addAttribute,
    removeAttribute,
    clearAttributes,
    updateOffset,
    updateSort,
    updateMinPrice,
    updateCurrentCategory,
    updateSubCategory,
    updateMaxPrice,
    updateBestsellers }
    = filterSlice.actions;

export default filterSlice.reducer;
