import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SmallCountry } from '../interfaces/countries';

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
    return this.http.get<SmallCountry[]>(`${this.baseUrl}/region/${region}?fields=name,cc3`)
  }

}
