import { AppError } from './app-error';

export class BadEmailError extends AppError {
    constructor(errorStatus: number, errorMsg: string) {
        super(errorStatus, errorMsg);
    }
}
