import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsUtils } from '../../../utils/forms-utils';

@Component({
  selector: 'app-dinamyc-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dinamyc-page.component.html',
})
export class DinamycPageComponent {

  private fb = inject(FormBuilder);
  formsUtils = FormsUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', Validators.required],
        ['Death Stranding', Validators.required]
      ],
      Validators.minLength(3)
    )
  });

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

}
