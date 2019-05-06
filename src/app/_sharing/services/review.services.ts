import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as globals from '../globals'
import { Review } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {

  private _apiUrl = `${globals._api}${globals._review}`

  constructor(private _http: HttpClient) { }

  public sendReview(id:string, rate: number, text: string, user) {
    return this._http.post<any>(`${this._apiUrl}/${id}`, {rate: rate, text: text, user}).subscribe()
  } 

  public getReviews(id: string): Observable<Review> {
    return this._http.get<Review>(`${this._apiUrl}/${id}`)
  }
  
}