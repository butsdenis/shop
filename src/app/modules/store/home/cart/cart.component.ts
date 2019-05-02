import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/_sharing/services';
import { Product } from 'src/app/_sharing/models';
import { Observable, of, Subscription } from 'rxjs';
import * as global from 'src/app/_sharing/globals';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  public dataSource = new MatTableDataSource<Product>()
  public displayedColumns: string[] = ['title', 'quantity', 'price', 'actions']

  public shoppingCartItems$: Observable<Product[]> = of([])
  public shoppingCartItems: Product[] = []

  public price: number

  private _subscription : Subscription

  private _api: string = global._api

  constructor(private _cartService: CartService) {}

  ngOnInit() {
    this.shoppingCartItems$ = this._cartService.getItems()
    this._subscription = this.shoppingCartItems$
      .subscribe(_ => {
        this.dataSource.data = _
        this.shoppingCartItems = _
      }) 
    this.getTotalAmount()

  }

  public add(item: Product) {
    this.shoppingCartItems.find(x => x._id === item._id).quantity++
    this.getTotalAmount()
  }

  public remove(item: Product) {
    this.shoppingCartItems.find(x => x._id === item._id).quantity--
    this.getTotalAmount()
    if(item.quantity === 0) {
      this.removeItem(item)
    }
  }
 
  public removeItem(item: Product) {
    this.shoppingCartItems.splice(
      this.shoppingCartItems.findIndex(x => x._id === item._id),
      1
    )
    this._cartService.removeFromCart(item)
    this.getTotalAmount()
  
  }

  public getTotalAmount() {
    this.price = this.shoppingCartItems.reduce((prev, current) => {
      return prev + (current.quantity*current.price)
    }, 0)
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
