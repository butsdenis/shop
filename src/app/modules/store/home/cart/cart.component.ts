import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/_sharing/services';
import { Product } from 'src/app/_sharing/models';
import { Observable, of, Subscription } from 'rxjs';
import * as global from 'src/app/_sharing/globals';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  public shoppingCartItems$: Observable<Product[]> = of([])
  public shoppingCartItems: Product[] = []


  private _api: string = global._api

  constructor(private _cartService: CartService) {}

  ngOnInit() {
    this.shoppingCartItems$ = this._cartService.getItems()
    this.shoppingCartItems$
      .subscribe(_ => {
          _.forEach(element => {
            if(this.shoppingCartItems.map(_ => _._id).indexOf(element._id) === -1) {
              element.quantity = 1
              this.shoppingCartItems.push(element)
            } else element.quantity ++ 
            
          });
        }
      )

  }


  public removeItem(item: Product) {
    this.shoppingCartItems.splice(
      this.shoppingCartItems.findIndex(x => x._id === item._id),
      1
    )
    this._cartService.removeFromCart(item)
  
  }

}
