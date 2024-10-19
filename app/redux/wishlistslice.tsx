import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../api/apiConfig';
import { Product } from '@/app/types/types'



type state = {
    wishlistItems: Product[];
    selectedItems: number[];
    actionTab: boolean;
    status: "loading" | "success" | "failure";
    error: string | undefined;
}

const initialState: state = {
    wishlistItems: [],
    selectedItems: [],
    actionTab: false,
    status: "loading",
    error: undefined
}

export const fetchWishlistItems = createAsyncThunk<Product[], string, { rejectValue: string }>(
    'wishlist/fetchWishlistItems',
    async (id, { rejectWithValue }) => {
        if (id) {
            try {
                const response = await apiRequest('GET', `http://localhost:3000/api/wishlist/${id}`);
                console.log(response)
                return response.data;
            } catch (error) {
                console.log(error)
                return rejectWithValue('Failed to fetch wishlist items');

            }
        }
        return [];
    }
);


export const removeWishlistItems = createAsyncThunk<Product[], string, { rejectValue: string }>(
    'wishlist/fetchWishlistItems',
    async (id, { rejectWithValue }) => {
        try {
            const response = await apiRequest('GET', `http://localhost:3000/api/wishlist/6`);
            console.log(response)
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue('Failed to fetch wishlist items');

        }
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        removeItem: (state: state, action) => {
            const filteredItems = state.wishlistItems.filter((item: Product) => action.payload !== item.id);
            state.wishlistItems = filteredItems;
        },
        showTab: (state: state, action) => {
            state.actionTab = action.payload;
        },
        handleSelectedItem: (state: state, action) => {
            const isThere = state.selectedItems.includes(action.payload);
            if (isThere) {
                const filteredItems = state.selectedItems.filter((item: number) => action.payload !== item);
                state.selectedItems = filteredItems;
            } else {
                state.selectedItems.push(action.payload);
            }
        },
        removeSelectedItems: (state: state) => {
            const filteredItems = state.wishlistItems.filter((item: Product) => !state.selectedItems.includes(item.id));
            state.wishlistItems = filteredItems;
            state.selectedItems = [];
        },
        selectAllItems: (state: state) => {
            const allitems = state.wishlistItems.map((item: Product) => item.id)
            state.selectedItems = allitems;
        },
        deSelectAllItems: (state: state) => {
            state.selectedItems = [];
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchWishlistItems.pending, (state) => {
            state.status = 'loading';
        });

        builder.addCase(fetchWishlistItems.fulfilled, (state, action) => {
            state.status = 'success';
            state.wishlistItems = action.payload;
        });

        builder.addCase(fetchWishlistItems.rejected, (state) => {
            state.status = 'failure';
        });
    }
})

export const { removeItem, showTab, handleSelectedItem, removeSelectedItems, selectAllItems, deSelectAllItems } = wishlistSlice.actions;
export default wishlistSlice.reducer;
