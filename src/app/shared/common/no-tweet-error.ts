import { AppError } from './app-error';

export class NoTweetError extends AppError {
    constructor(errorStatus: number, errorMsg: string) {
        super(errorStatus, errorMsg);
    }
}
