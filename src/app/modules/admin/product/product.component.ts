import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Product } from 'src/app/_sharing/models';
import { ProductService } from 'src/app/_sharing/services';


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
      })
  }

  public deleteProduct(id: string) {
    if (confirm(`Are you sure you want to delete the product. This cannot be undone.`)) {
      this._productService.deleteProduct(id).subscribe(
        res => {
          this.getProducts();
        }
      )
    }
  }

}
