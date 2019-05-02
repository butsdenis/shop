import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Product } from 'src/app/_sharing/models';
import { Observable, of, Subscription } from 'rxjs';
import { CartService } from 'src/app/_sharing/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  buyingForm: FormGroup;
	loading: boolean = false;
	submitted: boolean = false;
	error = '';

  public dataSource = new MatTableDataSource<Product>()
  public displayedColumns: string[] = ['title', 'quantity', 'price', 'actions']
  public shoppingCartItems$: Observable<Product[]> = of([])
  public shoppingCartItems: Product[] = []
  public price: number

  public myModel = ''
  public mask = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  private _subscription : Subscription

  constructor(	
    private formBuilder: FormBuilder,
    private _cartService: CartService) { }

  ngOnInit() {

    this.buyingForm = this.formBuilder.group({
      name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			phone: ['', Validators.required]
		});

    this.shoppingCartItems$ = this._cartService.getItems()
    this._subscription = this.shoppingCartItems$
      .subscribe(_ => {
        this.dataSource.data = _
        this.shoppingCartItems = _
      }) 
    
    this.getTotalAmount()
  }

  public getTotalAmount() {
    this.price = this.shoppingCartItems.reduce((prev, current) => {
      return prev + (current.quantity*current.price)
    }, 0)
  }

  public removeItem(item: Product) {
    this.shoppingCartItems.splice(
      this.shoppingCartItems.findIndex(x => x._id === item._id),
      1
    )
    this._cartService.removeFromCart(item)
    this.getTotalAmount()
  
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
