import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';
import * as globals from '../globals';



@Injectable({
  providedIn: 'root'
})

export class UserService {

  private _apiUrl = `${globals._api}${globals._users}`;

  constructor(
    private _http: HttpClient
  ) {}

  public getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this._apiUrl)
  }

  public editUser(category: User, id: string): Observable<User> {
    return this._http.patch<User>(`${this._apiUrl}/${id}`, category)
  }

  public editUserRole(role: string, id: string): Observable<User> {
    return this._http.patch<User>(`${this._apiUrl}/${globals._role}/${id}`, {role: role})
  }

  public deleteUser(id: string){
    return this._http.delete(`${this._apiUrl}/${id}`)
  }
}