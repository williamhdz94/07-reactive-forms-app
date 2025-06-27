import { FormGroup } from "@angular/forms";

export class FormsUtils {

  static  isValidField( form: FormGroup, fieldName: keyof typeof form.controls ): boolean | null {
    return (form.controls[fieldName].errors && form.controls[fieldName].touched);
  }

  static getFieldError( form: FormGroup, fieldName: keyof typeof form.controls ): string | null {
    if( !form.controls[fieldName] ) return null;

    const errors = form.controls[fieldName].errors ?? {};

    for (const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
        return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${ errors['minlength'].requiredLength } caracteres`;

        case 'min':
          return `Valor mínimo de ${ errors['min'].min }`
      }
    }

    return null;
  }

}
