import { createSlice } from "@reduxjs/toolkit";

export const HomeSlice = createSlice({
    name: 'home',
    initialState: {
        url: { name: 'Testing redux' },
        genres: {}
    },

    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },

        getGeners: (state, action) => {
            state.genres = action.payload;
        }
    }
})


export const { getApiConfiguration, getGeners } = HomeSlice.actions;

export default HomeSlice.reducer;