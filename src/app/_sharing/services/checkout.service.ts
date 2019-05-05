import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as globals from '../globals'
import { Order } from '../models';

@Injectable({
  providedIn: 'root'
})

export class CheckoutService {
  
  private _apiUrl = `${globals._api}${globals._order}`

  constructor(
    private _http: HttpClient
  ) {}
  
  public sendOrder(buyingForm, order) {
    return this._http.post<any>(this._apiUrl, {buyingForm, order})
  }

  public getOrders() {
    return this._http.get<Order>(this._apiUrl)
  }
  
}