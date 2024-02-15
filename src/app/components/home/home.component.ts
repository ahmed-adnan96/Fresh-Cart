import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsAllService } from './../../services/products-all.service';
import { ProductsShow } from 'src/app/interface/products-show';
import { Subscription } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from 'src/app/services/category.service';
import { CategorySlider } from 'src/app/interface/category-slider';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private _ProductsAllService: ProductsAllService,
    private _CategoryService: CategoryService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  productdetails: ProductsShow[] = [];
  termPro: string = '';
  categSlid: CategorySlider[] = [];
  cancel: Subscription = new Subscription();
  ngOnInit(): void {
    this.cancel = this._ProductsAllService.getProductAll().subscribe({
      next: (res) => {
        this.productdetails = res.data;
        console.log(this.productdetails);
      },
      error: (err) => console.log(err),
    });

    this._CategoryService.getAllCategory().subscribe({
      next: (res) => {
        console.log('category', res.data);
        this.categSlid = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProduct(productId: any): void {
    this._CartService.productById(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.cartNumber.next(res.numOfCartItems);
        console.log(this._CartService.cartNumber);
        this._ToastrService.success(res.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.cancel.unsubscribe();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
}
