import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonRegister } from '../interfaces/personRegister';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string ='http://localhost:3000/users'

  constructor(private http: HttpClient) { }

  postUser(user: PersonRegister){
    return this.http.post<PersonRegister>(this.url,user)
  }
}
