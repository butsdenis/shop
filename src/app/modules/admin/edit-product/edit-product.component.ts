import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/_sharing/models';
import { ProductService, CategoryService } from 'src/app/_sharing/services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, debounceTime, startWith, map } from 'rxjs/operators';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';

 
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  
  separatorKeysCodes: number[] = [ENTER, COMMA];

  public editProductForm: FormGroup;
  public data: Observable<Product>;
  public id: string;
  allCat: string[] = [];
  cat;
  selectedCategory;
  categories: string[];
  fileType: boolean = true;
  filteredCategories: Observable<string[]>;


  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _categoryService: CategoryService
  ) {}


  ngOnInit() {
    
    this._route.params
    .subscribe(param => {
      this.id = param._id;
    })

    this.editProductForm = this._fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)$')
      ])],
      image: ['', Validators.required]
    })

    this.data = this._productService.getProduct(this.id).pipe(
      tap(data => {

        if(data.category == null) {
          this.allCat = []
          this.selectedCategory = []      
        } else {
          this.allCat = data.category.map(_ => _.name)
          this.selectedCategory = data.category.map(_ => _._id)
        }
        
        this.editProductForm.patchValue(data)
      })
    )

    this.filteredCategories = this.editProductForm
      .get('category')
      .valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map(value => this._filter(value))  
      )
    
    this._categoryService.getCategories().subscribe(
      _ => {
        this.cat = _.map(_ => _)
        this.categories = _.map(_ => _.name)
      }
    )  
  }

  add(event: MatChipInputEvent): void {

    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        this.allCat.push(value.trim());
      }

      if (input) {
        input.value = '';
      }
  
      this.editProductForm.patchValue({category: this.selectedCategory});
    }
  }

  remove(category: string): void {
    const index = this.allCat.indexOf(category);

    if (index >= 0) {
      this.allCat.splice(index, 1)
      this.selectedCategory.splice(index, 1)
    }

    this.editProductForm.patchValue({category: this.selectedCategory});
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(this.allCat.indexOf(event.option.viewValue) == -1) {
      this.allCat.push(event.option.viewValue)
      this.selectedCategory.push(this.cat.find(x => x.name === event.option.viewValue)._id)
    }
    this.categoryInput.nativeElement.value = '';
    this.editProductForm.patchValue({category: this.selectedCategory});

  }

  private _filter(value) {
    console.log(value)
    const filterValue = value.toLowerCase();

    return this.categories.filter(category => category.toLowerCase().includes(filterValue));
  }

  public onFileSelected(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.editProductForm.get('image').setValue(file)
    }
    
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('image', this.editProductForm.get('image').value)
    formData.append('category', JSON.stringify(this.editProductForm.get('category').value))
    formData.append('title', this.editProductForm.get('title').value)
    formData.append('text', this.editProductForm.get('text').value)
    formData.append('price', this.editProductForm.get('price').value)
    this._productService.editProduct(formData, this.id)
      .subscribe(_ => {
        console.log(_), error => console.log(error)
      })
  }

}
