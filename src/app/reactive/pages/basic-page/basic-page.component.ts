import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {

  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })

  fb = inject(FormBuilder);

  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })

  isValidField( fieldName: keyof typeof this.myForm.controls ): boolean | null {
    return (this.myForm.controls[fieldName].errors && this.myForm.controls[fieldName].touched);
  }

  getFieldError( fieldName: keyof typeof this.myForm.controls ): string | null {
    if( !this.myForm.controls[fieldName] ) return null;

    const errors = this.myForm.controls[fieldName].errors ?? {};

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

  onSave() {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
  }

}
