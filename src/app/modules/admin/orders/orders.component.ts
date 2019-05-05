import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/_sharing/services';
import { Order } from 'src/app/_sharing/models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order;
  
  constructor(
    private _checkoutService: CheckoutService
  ) { }

  ngOnInit() {
    this._checkoutService.getOrders()
    .subscribe(_ => {
      this.orders = _
      console.log(_)})
  }

}
