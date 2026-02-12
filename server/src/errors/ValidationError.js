import { ApiError } from "../utils/ApiError.js";

export class ValidationError extends ApiError {
    constructor(message = "Validation Error", errors = []) {
        super(400, message, errors);
    }
}


