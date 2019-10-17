import { MatSnackBar } from '@angular/material/snack-bar';

export class AppError {
    constructor(
        public errorStatus: number,
        public errorMsg: string
    ) { }

    openSnackBar(snackBar: MatSnackBar) {
        snackBar.open(this.errorMsg, 'Close', {
            duration: 2000,
        });
    }
}
