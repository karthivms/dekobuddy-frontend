import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../api/apiConfig';
import { wishlistdata, wishlistItem } from '@/app/types/types'
import { RootState } from './store';



type state = {
    wishlistItems: wishlistItem[];
    selectedItems: number[];
    actionTab: boolean;
    status: "loading" | "success" | "failure";
    error: string | undefined;
}

interface deletebody {
    wishlist_id: number,
    user_id: number
}




const initialState: state = {
    wishlistItems: [],
    selectedItems: [],
    actionTab: false,
    status: "loading",
    error: undefined
}

export const fetchWishlistItems = createAsyncThunk<wishlistItem[], string, { rejectValue: string }>(
    'wishlist/fetchWishlistItems',
    async (id, { rejectWithValue }) => {
        if (id) {
            try {
                const response = await apiRequest('GET', `http://localhost:3000/api/wishlist/${id}`);
                return response.data;
            } catch (error) {
                console.log(error)
                return rejectWithValue('Failed to fetch wishlist items');

            }
        }
        return [];
    }
);

export const addWishlistItems = createAsyncThunk<wishlistItem[], wishlistdata, { rejectValue: string }>(
    "wishlist/addWishlistItems",
    async (wishlistdata, { rejectWithValue, getState }) => {

        if (wishlistdata.user_id) {
            try {
                const response = await apiRequest('POST', `http://localhost:3000/api/wishlist/`, wishlistdata);
                return response;
            } catch (error) {
                console.log(error);
                return rejectWithValue('Failed to add wishlist item');
            }
        } else {
            const state = getState() as RootState;
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist.wishlistItems));
        }
    })



export const removeWishlistItems = createAsyncThunk<wishlistItem[], deletebody, { rejectValue: string }>(
    "wishlist/removeWishlistItems",
    async (wishlistdata, { rejectWithValue, getState }) => {

        if (wishlistdata.user_id) {
            try {
                const response = await apiRequest('DELETE', `http://localhost:3000/api/wishlist/remove`, wishlistdata);
                return response;
            } catch (error) {
                console.log(error);
                return rejectWithValue('Failed to delete wishlist item');
            }
        } else {
            const state = getState() as RootState;
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist.wishlistItems));
        }
    })


export const removeSelectedWishlistItems = createAsyncThunk<wishlistItem[], number, { rejectValue: string }>(
    "wishlist/removSelectedWishlistItems",
    async (id, { rejectWithValue, getState }) => {

        if (id) {
            try {
                const state = getState() as RootState;
                const delmultiplebody = {
                    items: state.wishlist.selectedItems,
                    user_id: id
                }
                const response = await apiRequest('DELETE', `http://localhost:3000/api/wishlist/remove-multiple`, delmultiplebody);
                return response;
            } catch (error) {
                console.log(error);
                return rejectWithValue('Failed to delete wishlist items');
            }
        } else {
            const state = getState() as RootState;
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist.wishlistItems));
        }
    })

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        AddItem: (state, { payload }) => {

            const isItem = state.wishlistItems.find((item) => item.products.id === payload.product.id);

            const item = {
                id: payload.id,
                products: payload.product,
            }

            if (isItem) {
                const filteredItems = state.wishlistItems.filter((item) => item.products.id !== payload.product.id);
                state.wishlistItems = filteredItems;
            } else {
                state.wishlistItems.push(item);
            }
        },
        removeItem: (state: state, action) => {
            const filteredItems = state.wishlistItems.filter((item: wishlistItem) => action.payload !== item.id);
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
            const filteredItems = state.wishlistItems.filter((item: wishlistItem) => !state.selectedItems.includes(item.id));
            state.wishlistItems = filteredItems;
            state.selectedItems = [];
        },
        selectAllItems: (state: state) => {
            const allitems = state.wishlistItems.map((item: wishlistItem) => item.id)
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

export const { removeItem, showTab, handleSelectedItem, removeSelectedItems, selectAllItems, deSelectAllItems, AddItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
