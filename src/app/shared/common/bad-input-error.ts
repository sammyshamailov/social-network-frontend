import { AppError } from './app-error';

export class BadInputError extends AppError {
    constructor(errorStatus: number, errorMsg: string) {
        super(errorStatus, errorMsg);
    }
}
