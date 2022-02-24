export interface ValidationErrors {
    [type: string]: string;
}
export interface ErrorResponse {
    message: string,
    validation?: ValidationErrors
}
