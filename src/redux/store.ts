import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import rootReducer from './root/rootSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        root: rootReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;