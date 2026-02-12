import { ApiError } from "../utils/ApiError.js";

export class NotAuthenticatedError extends ApiError {
    constructor(message = "Not Authenticated") {
        super(401, message);
    }
}
