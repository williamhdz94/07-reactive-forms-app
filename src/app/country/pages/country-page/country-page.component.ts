import { ICountry } from './../../interfaces/ICountry';
import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [
    ReactiveFormsModule, JsonPipe
  ],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  });

  regions = signal( this.countryService.regions );
  countriesByRegion = signal<ICountry[]>([]);
  borders = signal<ICountry[]>([]);

  onFormChanged = effect( (onCleanup) => {

    const regionSubcription = this.onRegionChanged();
    const countrySubcription = this.onCountryChanged();

    onCleanup(() => {
      console.log('Limpiando...')
      regionSubcription?.unsubscribe();
      countrySubcription?.unsubscribe();
    })

  });

  onRegionChanged() {
    return this.myForm.get('region')?.valueChanges.pipe(
      tap(() => this.myForm.get('country')?.setValue('')),
      tap(() => this.myForm.get('border')?.setValue('')),
      tap(() => {
        this.borders.set([]);
        this.countriesByRegion.set([]);
      }),
      switchMap((region) => this.countryService.getCountriesByRegion(region ?? '')
      ),
    ).subscribe( (countries) => {
      this.countriesByRegion.set(countries);
    } )
  }

  onCountryChanged() {
    return this.myForm.get('country')?.valueChanges.pipe(
      tap(() => this.myForm.get('border')?.setValue('')),
      filter( value => value!.length > 0 ),
      switchMap( alphaCode => this.countryService.getCountriesByAlphaCode(alphaCode ?? '') ),
      switchMap( country =>  this.countryService.getCountriesNamesByCodesArray(country.borders))
    ).subscribe(( borders ) => {
      console.log({ borders })
      this.borders.set(borders);
    })
  }

}
