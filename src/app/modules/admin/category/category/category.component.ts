import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Category } from 'src/app/_sharing/models';
import { CategoryService } from 'src/app/_sharing/services';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {

  public dataSource = new MatTableDataSource<Category>();
  public displayedColumns: string[] = ['_id', 'name', 'actions'];

  constructor(
    private _categoryService: CategoryService
    ) { }

  ngOnInit() {
    this.getCategories();
  }

  public getCategories() {
    this._categoryService.getCategories()
      .subscribe(res => {
        this.dataSource.data = res;
      })
  }

  public deleteCategory(id: string) {
    if (confirm(`Are you sure you want to delete the category. This cannot be undone.`)) {
      this._categoryService.deleteCategory(id).subscribe(
        res => {
          this.getCategories();
        }
      )
    }
  }

}
