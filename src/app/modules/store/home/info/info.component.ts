import { Component, OnInit } from '@angular/core';
import { ProductService, AuthenticationService, ReviewService, UserService } from 'src/app/_sharing/services';
import { Product, Review, UserInfo } from 'src/app/_sharing/models';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import * as global from 'src/app/_sharing/globals'

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

export class InfoComponent implements OnInit {
  
  public id: string;
  product: Product;
  reviews: Review;
  userInfo: UserInfo;
  user
  private _api: string = global._api

  reviewForm = new FormGroup({
    text: new FormControl(''),
    rate: new FormControl('')
  })


  constructor(
    private _productService: ProductService, 
    private _route:ActivatedRoute,
    private _authService: AuthenticationService,
    private _reviewService: ReviewService,
    private _userService: UserService) { }

  ngOnInit() {
    this.getUserInfo()

    this._route.paramMap.subscribe(param => {
      this.id = param.get('_id')
    })

    this._productService.getProduct(this.id)
      .subscribe(data => {
        this.product = data;
      });

    this.getReview(this.id)
    
  }

  public isLogged = () => {
    return this._authService.isLogin()
  }

  onSubmit() {
 
    this.userInfo = {
      _id: this.user._id,
      name: this.user.name,
    }
    this._reviewService.sendReview(this.id, this.reviewForm.value.rate, this.reviewForm.value.text, this.userInfo)
    
    this.getReview(this.id)
  }

  public getReview(id: string) {
    this._reviewService.getReviews(id)
      .subscribe(data => {
        this.reviews = data;
      })
  }

  public getUserInfo() {
    if (this.isLogged()) {
      this._userService.getUser().subscribe(_ => this.user = _)
    }
  }
} 
