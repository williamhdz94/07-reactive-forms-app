import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsUtils } from '../../../utils/forms-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {

  fb = inject(FormBuilder);
  formsUtils = FormsUtils;

  myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true],
    termAndConditions: [false, Validators.requiredTrue]
  });

  onSubmit() {
    console.log(this.myForm.value);
    if( this.myForm.invalid ) this.myForm.markAllAsTouched();
  }

}
