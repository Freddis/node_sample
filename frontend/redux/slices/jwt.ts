import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface JwtState {
    value?: string,
}

const initialState: JwtState = {
}

export const jwtSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
})
