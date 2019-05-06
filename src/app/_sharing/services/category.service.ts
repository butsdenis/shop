import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Category } from '../models';
import * as globals from '../globals';



@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private _apiUrl = `${globals._api}${globals._category}`;

  constructor(
    private _http: HttpClient
  ) {}

  public getCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(this._apiUrl)
  }

  public getCategory(id: string): Observable<Category> {
    return this._http.get<Category>(`${this._apiUrl}/${id}`)
  }

  public addCategory(category: Category): Observable<Category> {
    return this._http.post<Category>(this._apiUrl, category)
  }

  public editCategory(category: Category, id: string): Observable<Category> {
    return this._http.patch<Category>(`${this._apiUrl}/${id}`, category)
  }

  public deleteCategory(id: string){
    return this._http.delete(`${this._apiUrl}/${id}`)
  }
}