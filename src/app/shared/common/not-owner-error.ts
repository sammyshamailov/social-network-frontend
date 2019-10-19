import { AppError } from './app-error';

export class NotOwnerError extends AppError {
    constructor(errorStatus: number, errorMsg: string) {
        super(errorStatus, errorMsg);
    }
}
