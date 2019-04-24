import { Component, OnInit } from '@angular/core'
import { CategoryService } from 'src/app/_sharing/services'
import { Category } from 'src/app/_sharing/models'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public categories: Category[]

  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit() {
    this._categoryService.getCategories()
      .subscribe( _ => {
        this.categories = _
      })

  }


}
