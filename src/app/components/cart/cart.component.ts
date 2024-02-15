import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
Router;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(
    private _CartService: CartService,
    private _Render2: Renderer2,
    private _Router: Router
  ) {}
  dataProduct: any = {};
  cancelApi: Subscription = new Subscription();
  products: [] = [];
  isloadingcarts: boolean = false;
  ngOnInit(): void {
    this.cancelApi = this._CartService.showCart().subscribe({
      next: ({ data }) => {
        console.log(data);
        this.isloadingcarts = true;
        this.dataProduct = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deletProduct(idProduct: string, btn: HTMLButtonElement): void {
    this._Render2.setAttribute(btn, 'disabled', 'true');
    this._CartService.removeItemCart(idProduct).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.cartNumber.next(res.numOfCartItems);
        this.dataProduct = res.data;
      },
      error: (err) => {
        console.log(err);
        console.log(localStorage.getItem('_token'));
      },
    });
  }
  changCountProduct(
    id: string,
    count: number,
    el1: HTMLButtonElement,
    el2: HTMLButtonElement
  ): void {
    if (count >= 1) {
      this._Render2.setAttribute(el1, 'disabled', 'true');
      this._Render2.setAttribute(el2, 'disabled', 'true');
      this._CartService.updateitem(id, count).subscribe({
        next: (res) => {
          console.log(res);
          this.dataProduct = res.data;
          this._Render2.removeAttribute(el1, 'disabled');
          this._Render2.removeAttribute(el2, 'disabled');
        },
        error: (err) => {
          console.log(err);
          this._Render2.removeAttribute(el1, 'disabled');
          this._Render2.removeAttribute(el2, 'disabled');
        },
      });
    }
  }

  clearAllProduct(): void {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        this.dataProduct = 'Not Have Any product';
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.cancelApi.unsubscribe();
    console.log('canceled');
  }
}
