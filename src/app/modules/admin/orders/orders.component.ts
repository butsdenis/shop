import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/_sharing/services';
import { Order } from 'src/app/_sharing/models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order
  statuses = [
    {value: 'expect', viewValue: 'Expected'},
    {value: 'complited', viewValue: 'Complited'},
    {value: 'canceled', viewValue: 'Canceled'}
  ];
  
  constructor(
    private _checkoutService: CheckoutService
  ) { }

  ngOnInit() {
    this.getOrders()
  }

  public selectStatus(event, id:string) {
    this._checkoutService.changeStatus(event.value, id)
    .subscribe(_ => {
      this.getOrders()
    })
  }

  public getOrders() {
    this._checkoutService.getOrders()
    .subscribe(_ => this.orders = _)
  }

}
