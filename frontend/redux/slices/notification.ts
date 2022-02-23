import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum NotificationType {
    success,
    error,
}

export interface NotificationState {
    text: string,
    type: NotificationType,
    shown: boolean
}

const initialState: NotificationState = {
    text: "empty",
    type: NotificationType.error,
    shown: true,
}

export const notificationSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        showErrorAlert: (state, action: PayloadAction<string>) => {
            state.type = NotificationType.error;
            state.text = action.payload;
            state.shown = false;
        },
        showSuccessfulAlert: (state, action: PayloadAction<string>) => {
            state.type = NotificationType.success;
            state.text = action.payload;
            state.shown = false;
        },
    },
})
