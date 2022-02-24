import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {notificationSlice} from "./slices/notification";
import {jwtSlice} from "./slices/jwt";


export const store = configureStore({
    reducer: {
        notification: notificationSlice.reducer,
        jwt: jwtSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
