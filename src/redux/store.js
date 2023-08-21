import { configureStore } from '@reduxjs/toolkit';
import HomeSlice from './slices/homeSlice';

export const store = configureStore({
    reducer: {
        home: HomeSlice,

    }
}
)