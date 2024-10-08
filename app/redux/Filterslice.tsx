import { createSlice } from '@reduxjs/toolkit';


const filterSlice = createSlice({
    name: "Filter",
    initialState: [] as string[],
    reducers: {
        addAttribute: (state, action) => {
            state.push(action.payload);
        },
        removeAttribute: (state, action) => {
            return state.filter(attr => attr !== action.payload);
        },
        clearAttributes: () => {
            return [];
        }
    },
})

export const { addAttribute, removeAttribute, clearAttributes } = filterSlice.actions;


export default filterSlice.reducer;
