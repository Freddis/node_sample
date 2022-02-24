import {ValidationErrors} from "../../types/ErrorResponse";
import React from "react";

const ValidationError : React.FC<{errors: ValidationErrors, field: string}> = ({errors,field}) => {
    if(!errors[field]){
        return null;
    }
    return <>
        <div className={"validation-error alert-danger"} role="alert">{errors[field]}</div>
    </>
}

export default ValidationError;
