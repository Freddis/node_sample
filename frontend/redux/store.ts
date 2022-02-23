import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {notificationSlice} from "./slices/notification";


export const store = configureStore({
    reducer: {
        notification: notificationSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
