import { Injectable } from '@angular/core';
import { Product } from '../models';
import { Observable, BehaviorSubject } from 'rxjs';

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
    this.itemsInCartSubject.next([...this.itemsInCart, item]);
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