import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/_sharing/services';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  public addCategoryForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService
  ) {}


  ngOnInit() {

    this.addCategoryForm = this._fb.group({
      name: ['', Validators.required]
    })

  }

  onSubmit() {

    this._categoryService.addCategory(this.addCategoryForm.value)
      .subscribe(_ => _)
  }

}
