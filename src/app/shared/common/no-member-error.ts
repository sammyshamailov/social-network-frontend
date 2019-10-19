import { AppError } from './app-error';

export class NoMemberError extends AppError {
    constructor(errorStatus: number, errorMsg: string) {
        super(errorStatus, errorMsg);
    }
}
