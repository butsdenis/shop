import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/_sharing/models';
import { CategoryService } from 'src/app/_sharing/services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


 
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent implements OnInit {


  public editCategoryForm: FormGroup;
  public data: Observable<Category>;
  public id: string;

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _categoryService: CategoryService
  ) {}


  ngOnInit() {
    
    this._route.params
    .subscribe(param => {
      this.id = param._id;
    })

    this.editCategoryForm = this._fb.group({
      name: ['', Validators.required]
    })

    this.data = this._categoryService.getCategory(this.id)
      .pipe(
      tap(data => {
        this.editCategoryForm.patchValue(data)
      })
    )
  }

  onSubmit() {

    this._categoryService.editCategory(this.editCategoryForm.value, this.id)
      .subscribe(_ => _)
  }

}
