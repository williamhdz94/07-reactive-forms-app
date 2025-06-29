import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormsUtils {

  // Regex
  public static readonly namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  public static readonly emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public static readonly notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
        return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${ errors['minlength'].requiredLength } caracteres`;

        case 'min':
          return `Valor mínimo de ${ errors['min'].min }`

        case 'email':
          return `Debe ser un correo valido`;

        case 'pattern':
          if( errors['pattern'].requiredPattern === FormsUtils.emailPattern ) {
            return `El correo electrónico es inválido`
          }

        return `Error de validación contra pattern`;

        case 'passWordNotEqual':
          return `Las contraseñas deben ser iguales`;

        default:
          return `Error de validación no controlado ${ key }`
      }
    }

    return '';
  }

  static  isValidField( form: FormGroup, fieldName: keyof typeof form.controls ): boolean | null {
    return (form.controls[fieldName].errors && form.controls[fieldName].touched);
  }

  static getFieldError( form: FormGroup, fieldName: keyof typeof form.controls ): string | null {
    if( !form.controls[fieldName] ) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    )
  }

  static getFieldErrorInArray( formArray: FormArray, index: number ): string | null {
    if( !formArray.controls[index] ) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getTextError(errors);
  }

  static isFieldOneEqualFieldTwo( field1: string, field2: string ) {
    return ( formGroup: AbstractControl ) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passWordNotEqual: true }
    }
  }

}
