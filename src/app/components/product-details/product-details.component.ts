import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsAllService } from './../../services/products-all.service';
import { Subscription } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from './../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsAllService: ProductsAllService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  productId: any;
  productDetails: any = {};
  imgProduct: string[] = [];
  dataProduct: any = {};
  cancelApiProduct: Subscription = new Subscription();

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.productId = param.get('id');
        console.log('this is id ', this.productId);
      },
    });

    this.cancelApiProduct = this._ProductsAllService
      .getProductById(this.productId)
      .subscribe({
        next: (res) => {
          this.productDetails = res.data;
          console.log(this.productDetails);
          this.imgProduct = this.productDetails.images;
        },
        error: (err) => {
          console.log('this is error from Api ', err);
        },
      });
  }

  addProduct(productId: any): void {
    this._CartService.productById(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: false,
  };

  ngOnDestroy(): void {
    this.cancelApiProduct.unsubscribe();
  }
}
