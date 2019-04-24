import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
import * as globals from '../globals';
import * as jwt_decode from "jwt-decode";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private _apiUrl = `${globals._api}${globals._login}`

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(this._apiUrl, { email, password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }
  
  isLogin() {
		return localStorage.getItem('currentUser') != null;
	}

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getRole() {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      const role = this.getDecodedAccessToken()
      return role.role == 'admin' || role.role == 'super'
    }
    return false
  }

  getDecodedAccessToken(): any {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    
    try {
      return jwt_decode(currentUser.token);
    }
    catch (Error) {
      return null;
    }
  }
}