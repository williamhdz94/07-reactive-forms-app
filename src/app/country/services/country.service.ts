import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { ICountry } from '../interfaces/ICountry';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  private baseUrl = `https://restcountries.com/v3.1`
  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ]

  get regions(): string[] {
    return [ ...this._regions ]
  }

  getCountriesByRegion( region: string ): Observable<ICountry[]> {
    if( !region ) return of([]);

    const url = `${ this.baseUrl }/region/${ region }?fields=cca3,name,borders`;

    return this.http.get<ICountry[]>(url);
  }

  getCountriesByAlphaCode( alphaCode: string ): Observable<ICountry> {
    const url = `${ this.baseUrl }/alpha/${ alphaCode }?fields=cca3,name,borders`;

    return this.http.get<ICountry>(url);
  }

  getCountriesNamesByCodesArray( countryCodes: string[] ): Observable<ICountry[]> {
    if ( !countryCodes || countryCodes.length === 0 ) return of([]);

    const countriesRequest: Observable<ICountry>[] = [];

    countryCodes.forEach( code =>  {
      const request = this.getCountriesByAlphaCode(code);
      countriesRequest.push(request);
    });

    return combineLatest( countriesRequest );

  }

}
