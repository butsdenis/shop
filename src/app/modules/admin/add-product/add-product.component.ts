import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, CategoryService } from 'src/app/_sharing/services';
import { Category } from 'src/app/_sharing/models';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent implements OnInit {

  public addProductForm: FormGroup
  selectedFile: File = null
  fileType: boolean = true
  categoryList: Category[]
  error: string

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private _productService: ProductService
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

  public onFileSelect(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.addProductForm.get('image').setValue(file)
    }
  }

  public onSubmit() {
    const formData = new FormData();
    formData.append('image', this.addProductForm.get('image').value)
    formData.append('category', JSON.stringify(this.addProductForm.get('category').value))
    formData.append('title', this.addProductForm.get('title').value)
    formData.append('text', this.addProductForm.get('text').value)
    formData.append('price', this.addProductForm.get('price').value)
    this._productService.addProduct(formData)
    .subscribe(_ => console.log(_), error => this.error = error)
  }

}
