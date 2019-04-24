import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Product } from 'src/app/_sharing/models';
import { ProductService } from 'src/app/_sharing/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  public dataSource = new MatTableDataSource<Product>();
  public displayedColumns: string[] = ['_id', 'title', 'image', 'text', 'price', 'category', 'actions'];

  constructor(
    private _productService: ProductService
    ) { }

  ngOnInit() {
    this.getProducts();
  }

  public getProducts() {
    this._productService.getProducts()
      .subscribe(res => {
        this.dataSource.data = res;
        console.log(this.dataSource.data)
      })
  }

}
