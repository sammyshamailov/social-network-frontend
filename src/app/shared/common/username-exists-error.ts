import { AppError } from './app-error';

export class UsernameExistsError extends AppError {
    constructor(errorStatus: number, errorMsg: string) {
        super(errorStatus, errorMsg);
    }
}
