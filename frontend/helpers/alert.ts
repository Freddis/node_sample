import {notificationSlice} from "../redux/slices/notification";


export function showErrorAlert(dispatch: any, msg: string) {
    dispatch(notificationSlice.actions.showErrorAlert(msg))
}

export function showSuccessfulAlert(dispatch: any, msg: string) {
    dispatch(notificationSlice.actions.showSuccessfulAlert(msg))
}

export function showApiError(dispatch: any) {
    return (e: Error) => {
        dispatch(notificationSlice.actions.showErrorAlert("API Error"));
    }
}
