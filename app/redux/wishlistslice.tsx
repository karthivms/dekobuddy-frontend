import { createSlice } from '@reduxjs/toolkit';
import products from "@/app/datas/category/products.json";

const data = products.slice(0, 6);

interface Product {
    id: number;
    name: string;
    img_url: string;
    props: string;
    no_of_reviews: number;
    price: number;
    discount: number;
}

type state = {
    wishlistItems: Product[];
    selectedItems: number[];
    actionTab: boolean;
    status: "loading" | "success" | "failure";
    error: string | undefined;
  }

const initialState : state = {
    wishlistItems: data,
    selectedItems: [],
    actionTab: false,
    status: "loading",
    error: undefined
}

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
        selectAllItems: (state : state) => {
            const allitems = state.wishlistItems.map((item:Product) => item.id)
            state.selectedItems = allitems;
        },
        deSelectAllItems: (state : state) => {
            state.selectedItems = [];
        },
    }
})

export const { removeItem, showTab, handleSelectedItem, removeSelectedItems, selectAllItems, deSelectAllItems } = wishlistSlice.actions;
export default wishlistSlice.reducer;
