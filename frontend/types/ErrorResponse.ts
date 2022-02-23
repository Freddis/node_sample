export interface ErrorResponse {
    message: string,
    validation?: {
        [type: string]: string;
    }
}
