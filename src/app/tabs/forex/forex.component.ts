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

  constructor(private currencyService: CurrencyService,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.getCurrencies();
    this.forexForm = this.fb.group({
      amount: ['1', [Validators.required, Validators.minLength(1)]],
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
    const from = this.forexForm.get('fromCurrency').value.split(',')[0];
    const to = this.forexForm.get('toCurrency').value.split(',')[0];
    let amountInput = this.forexForm.get('amount').value;
    if (amountInput < 0) {
      amountInput *= -1;
      this.forexForm.patchValue({
        amount: amountInput
      });
    }
    const value = 'Realtime Currency Exchange Rate';
    const res = this.currencyService.getFx(from, to);
    let ex;
    res.subscribe(data => {
      this.result = data[value];
      ex = this.result['5. Exchange Rate'];
      const calcResult = Math.round((Number(amountInput) * Number(ex)) * 100) / 100;
      this.resultMsg = `${amountInput} ${from} = ${calcResult} ${to}`;
    });
  }

  change() {
    this.forexForm.patchValue({
      fromCurrency: this.forexForm.get('toCurrency').value,
      toCurrency: this.forexForm.get('fromCurrency').value
    });
  }
}
