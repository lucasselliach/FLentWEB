import { AbstractControl } from '@angular/forms';

export class VerificarPasswords {
    static MatchPassword(AC: AbstractControl) {
       const password = AC.get('gestorPassword').value;
       const confirmPassword = AC.get('gestorPasswordConfirmacao').value;
        if (password !== confirmPassword) {
            AC.get('gestorPasswordConfirmacao').setErrors( {MatchPassword: true} );
        } else {
            return null;
        }
    }
}
