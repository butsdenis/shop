import { Component, OnInit, Input } from '@angular/core'
import { Product } from 'src/app/_sharing/models'
import { ProductService, CartService } from 'src/app/_sharing/services'
import * as global from 'src/app/_sharing/globals'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() id: string;

  public products: Product[]
  private _api: string = global._api

  constructor(
    private _productService: ProductService,
    private _cartService: CartService
  ) { }

  ngOnInit() {
    if(this.id == undefined) {
      this._productService.getProducts()
        .subscribe(_ => {
        this.products = _
      })
    } else {
      this._productService.getProductsByCategory(this.id)
        .subscribe(_ => {
        this.products = _
      })
    }
    
  }

  public addProduct(product: Product) {
    this._cartService.addToCart(product)
  }

}
