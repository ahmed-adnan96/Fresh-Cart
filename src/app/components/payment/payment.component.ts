import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentsService } from './../../services/payments.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _PaymentsService: PaymentsService
  ) {}
  idCart: string | null = '';
  detAddr: object = {};
  ngOnInit(): void {
    // this._ActivatedRoute.paramMap.subscribe({
    //   next: (param) => {},
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        console.log(param.get('id'));
        this.idCart = param.get('id');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  orderForm: FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  });

  checkOut(_id: any, adrs: object): void {
    this._PaymentsService.orderPay(_id, adrs).subscribe({
      next: (res) => {
        console.log(res);
        this.detAddr = res.value;
        console.log(res.session.url);
        window.open(res.session.url, '_self');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
