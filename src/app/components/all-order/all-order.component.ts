import { Component, OnInit } from '@angular/core';
import { PaymentsService } from 'src/app/services/payments.service';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.scss'],
})
export class AllOrderComponent implements OnInit {
  constructor(
    private _PaymentsService: PaymentsService,
    private _ActivatedRoute: ActivatedRoute,
    private _JwtHelperService: JwtHelperService
  ) {}
  myToken: any = localStorage.getItem('_token');

  showOdr(id: any): void {
    this._PaymentsService.getAllOrders(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    const idUser: string = this._JwtHelperService.decodeToken(this.myToken).id;
    // console.log(idUser);
    this.showOdr(idUser);
  }
}
