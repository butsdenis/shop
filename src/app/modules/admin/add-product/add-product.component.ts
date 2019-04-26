import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, CategoryService } from 'src/app/_sharing/services';
import { Category } from 'src/app/_sharing/models';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent implements OnInit {

  public addProductForm: FormGroup;
  selectedFile: File = null;
  fileType: boolean = true;
  categoryList: Category[];
  fd;

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.addProductForm = this._fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      category: [''],
      price: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)$')
      ])],
      image: ['']
    })

    this._categoryService.getCategories().subscribe(
      _ => {
        this.categoryList = _.map(_ => _)
      }
    )  

  }

  public onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.addProductForm.get('avatar').patchValue(file);
    }
  }


  public onSubmit() {
    this._productService.addProduct(this.addProductForm.value)
    .subscribe(_ => console.log(_))
  }

}
