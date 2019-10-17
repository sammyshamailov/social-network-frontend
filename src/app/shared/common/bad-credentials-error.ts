import { AppError } from './app-error';

export class BadCredentialsError extends AppError {
    constructor(errorStatus: number, errorMsg: string) {
        super(errorStatus, errorMsg);
    }
}
