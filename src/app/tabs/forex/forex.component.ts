import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.scss']
})
export class ForexComponent implements OnInit {

  forexForm: FormGroup;
  currencies: any = [];
  result: any;
  resultMsg: any;
  loading: boolean;
  reload: boolean;

  from: string;
  to: string;

  constructor(private currencyService: CurrencyService,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.getCurrencies();
    this.forexForm = this.fb.group({
      amount: ['1', [Validators.required, Validators.minLength(1), Validators.min(0)]],
      fromCurrency: ['', [Validators.required]],
      toCurrency: ['', [Validators.required]]
    });
    this.loading = false;
  }

  getCurrencies() {
    const allCurrencies = this.currencyService.getCurrencies();
    let currencies = {};
    allCurrencies.subscribe(data => {
      currencies = data;
      for (const i in currencies) {
        this.currencies.push([i, currencies[i]]);
      }
    });
  }

  convert() {
    this.loading = true;
    this.resultMsg = null;
    this.reload = false;
    this.from = this.forexForm.get('fromCurrency').value.split(',')[0];
    this.to = this.forexForm.get('toCurrency').value.split(',')[0];
    const amountInput = this.forexForm.get('amount').value;
    this.currencyService.getFx(this.from,this.to).subscribe(data => {
      this.result = data['Realtime Currency Exchange Rate'];
      const ex = this.result['5. Exchange Rate'];
      const calcResult = Math.round((Number(amountInput) * Number(ex)) * 100) / 100;
      this.resultMsg = `${amountInput} ${this.from} = ${calcResult} ${this.to}`;
      this.reload = true;
      this.loading = false;
    });
  }

  validateAmount(value) {
    if (value < 0) {
      value *= -1;
      this.forexForm.patchValue({
        amount: value
      });
    }
  }

  change() {
    this.forexForm.patchValue({
      fromCurrency: this.forexForm.get('toCurrency').value,
      toCurrency: this.forexForm.get('fromCurrency').value
    });
  }

}
