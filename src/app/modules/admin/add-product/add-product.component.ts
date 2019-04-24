import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent implements OnInit {

  public addProductForm: FormGroup;
  selectedFile: File = null;
  fileType: boolean = true;

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.addProductForm = this._fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)$')
      ])],
      file: ['', Validators.required]
    })

  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    if(this.selectedFile.type == 'image/png' || this.selectedFile.type == 'image/jpeg') {
      this.fileType = true;
    } else {
      this.fileType = false;
    }
  }

}
