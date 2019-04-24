import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { Product } from '../models/index'
import * as globals from '../globals'
import { NgForm, FormGroup } from '@angular/forms'


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _apiUrl = `${globals._api}${globals._product}`

  constructor(
    private _http: HttpClient
  ) { }

  public getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this._apiUrl)
  }

  public getProduct(_id: string): Observable<Product> {
    const product = `${this._apiUrl}/${_id}`
    return this._http.get<Product>(product)
  }

  public getProductsByCategory(id: string): Observable<Product[]> {
    const products = `${this._apiUrl}/${globals._category}/${id}`;
    return this._http.get<Product[]>(products)
  }

  public addProduct(product: NgForm): Observable<Product> {
    return this._http.post<Product>(this._apiUrl, product)
  }

  public editProduct(product: Product, id: string): Observable<Product> {
    return this._http.patch<Product>(`${this._apiUrl}/${id}`, product)
  }

}