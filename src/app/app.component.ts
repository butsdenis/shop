import { Component } from '@angular/core';
import { AuthenticationService, CartService } from './_sharing/services';
import { Observable } from 'rxjs';
import { Product } from './_sharing/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public shoppingCartItems$: Observable<Product[]>;

  constructor(
    private _authService: AuthenticationService,
    private _cartService: CartService
  ) {

    this.shoppingCartItems$ = this
      ._cartService
      .getItems();

    this.shoppingCartItems$.subscribe(_ => _);

  }

  public isLogged = () => {
    return this._authService.isLogin()
  }

  public logOut = () => {
    this._authService.logout()
  }

  public getRole = () => {
    return this._authService.getRole()
  }
}