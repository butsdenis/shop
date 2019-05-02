import { Injectable } from '@angular/core';
import { Product } from '../models';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  
  private itemsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private itemsInCart: Product[] = [];
  
  constructor() {
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _)
  }
  
  public addToCart(item: Product) {
    const added = this.itemsInCart.find(i => i._id == item._id)
    if(!added) {
      item.quantity = 1;
      this.itemsInCartSubject.next([...this.itemsInCart, item]);
    } else {
      this.itemsInCart.find(i => i._id == item._id).quantity++
      this.itemsInCartSubject.next([...this.itemsInCart]);
    }
  }

  public getItems(): Observable<Product[]> {
    return this.itemsInCartSubject;
  }

  public removeFromCart(item: Product) {
    const currentItems = [...this.itemsInCart];
    const itemsWithoutRemoved = currentItems.filter(_ => _._id !== item._id);
    this.itemsInCartSubject.next(itemsWithoutRemoved);
  }
  
}