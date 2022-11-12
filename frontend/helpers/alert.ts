import {notificationSlice} from "../redux/slices/notification";
import {Dispatch} from "redux";


export function showErrorAlert(dispatch: Dispatch, msg: string) {
    dispatch(notificationSlice.actions.showErrorAlert(msg))
}

export function showSuccessfulAlert(dispatch: Dispatch, msg: string) {
    dispatch(notificationSlice.actions.showSuccessfulAlert(msg))
}

export function showApiError(dispatch:  Dispatch) {
    return (e: Error) => {
        dispatch(notificationSlice.actions.showErrorAlert(e.message));
    }
}
