import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar-blanck',
  templateUrl: './navbar-blanck.component.html',
  styleUrls: ['./navbar-blanck.component.scss'],
})
export class NavbarBlanckComponent implements OnInit {
  constructor(
    private _Router: Router,
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) {}
  @ViewChild('navBar') navbarMain!: ElementRef;

  cartCount: number = 0;
  @HostListener('window:scroll')
  onScroll() {
    if (window.scrollY > 300) {
      this._Renderer2.addClass(this.navbarMain.nativeElement, 'px-5');
      this._Renderer2.addClass(this.navbarMain.nativeElement, 'shadow');
      this._Renderer2.setStyle(
        this.navbarMain.nativeElement,
        'backGround',
        'red'
      );
    } else {
      this._Renderer2.removeClass(this.navbarMain.nativeElement, 'px-5');
    }
  }
  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (number) => {
        this.cartCount = number;
      },
    });
    this._CartService.showCart().subscribe({
      next: (res) => {
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
    });
  }

  signOut(): void {
    localStorage.removeItem('_token');
    this._Router.navigate(['/login']);
  }
}
