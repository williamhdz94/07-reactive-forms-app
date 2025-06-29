import { AbstractControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsUtils } from '../../../utils/forms-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  fb = inject(FormBuilder);
  formsUtils = FormsUtils;

  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern( this.formsUtils.namePattern )] ],
    email: ['', [Validators.required, Validators.pattern( this.formsUtils.emailPattern )] ],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern( this.formsUtils.notOnlySpacesPattern )]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  }, {
    Validators: [
      this.formsUtils.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  onRegister() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }



}
