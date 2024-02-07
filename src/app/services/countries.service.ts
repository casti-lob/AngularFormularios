import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { CountryBorders, SmallCountry } from '../interfaces/countries';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions: string[]=['Africa', 'Americas','Antartic', 'Asia', 'Europe', 'Oceania']
  private baseUrl :string = 'https://restcountries.com/v3.1'
  get regions(){
    return [...this._regions]
  }

  constructor(private http: HttpClient) { }

  getCountriesByRegion(region:string):Observable<SmallCountry[]>{
    if(!region){
      return of([])
    }
    return this.http.get<SmallCountry[]>(`${this.baseUrl}/region/${region}?fields=name,ccn3`)
  }
  getBordersByCountry(code: string): Observable<CountryBorders|null>{
    if(!code){
      return of(null)
    }else{
      return this.http.get<CountryBorders>(`${this.baseUrl}/alpha/${code}?fields=borders`)

    }
  }

 getCountryByCode( code: string): Observable<SmallCountry> {
    return this.http.get<SmallCountry>(`${this.baseUrl}/alpha/${code}?fields=name,ccn3`);
  }

  getCountriesByCode(borders: string[]): Observable<SmallCountry[]>{
    if (!borders){
      return of([])
    }else if(!borders.length){
      return of([])
    }

    const requests: Observable<SmallCountry>[] = [];
    borders.forEach( code => {
      const request = this.getCountryByCode(code);
      requests.push(request)
    })

    return combineLatest(requests)
  }
}
