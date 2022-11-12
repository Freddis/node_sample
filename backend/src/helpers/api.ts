import {ValidationError} from "class-validator";
import {Response} from 'express';

interface ErrorResponse {
    error: {
        message: string,
    }
}

interface ValidationErrorResponse {
    error: {
        message: string,
        validation: {
            [type: string]: string;
        }
    }
}

export function respondWithError(res: Response, message: string = "Unknown Error",status:number = 400) {
    const data : ErrorResponse = {
        error: {
            message,
        }
    };
    res.status(status);
    res.json(data);
}

export function respondWithBadValidation(res: Response, message: string = "Unknown Error", validationErrors: ValidationError[]) {
    const data: ValidationErrorResponse = {
        error: {
            message,
            validation: {},
        }
    };

    validationErrors.forEach(error => {
        const firstKey = Object.keys(error.constraints)[0];
        data.error.validation[error.property] = error.constraints[firstKey];
    });

    res.status(400);
    res.json(data);
}
