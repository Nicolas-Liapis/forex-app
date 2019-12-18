import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.scss']
})
export class ForexComponent implements OnInit {

  forexForm: FormGroup;
  result: any;
  resultMsg: any;
  loading: boolean;
  reload: boolean;
  from: string;
  to: string;
  cleanFrom: string;
  cleanTo: string;
  wait = false;

  constructor(private currencyService: CurrencyService,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.forexForm = this.fb.group({
      amount: ['1', [Validators.required, Validators.minLength(1), Validators.min(0)]]
    });
    this.loading = false;
  }

  change() {
    this.to = [this.from, this.from = this.to][0];
    this.cleanFrom = this.from.split(',')[0];
    this.cleanTo = this.to.split(',')[0];
  }

  convert() {
    this.loading = true;
    this.resultMsg = null;
    this.reload = false;
    this.cleanFrom = this.from.split(',')[0];
    this.cleanTo = this.to.split(',')[0];
    const amountInput = this.forexForm.get('amount').value;
    this.currencyService.getFx(this.cleanFrom, this.cleanTo).pipe(catchError(err => of([])))
      .subscribe(
        res => {
          if(res['Error Message']) {
            this.resultMsg = 'Invalid currencies';
            this.loading = false;
          }
          this.result = res['Realtime Currency Exchange Rate'];
          const ex = this.result['5. Exchange Rate'];
          const calcResult = Math.round((Number(amountInput) * Number(ex)) * 100) / 100;
          this.resultMsg = `${amountInput} ${this.cleanFrom} = ${calcResult} ${this.cleanTo}`;
          this.reload = true;
          this.loading = false;
      }
    );
    this.wait = true;
    setTimeout(() => {
      this.wait = false;
 }, 8000);
  }

  validateAmount(value) {
    if (value < 0) {
      value *= -1;
      this.forexForm.patchValue({
        amount: value
      });
    }
  }
}
