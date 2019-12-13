import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-rates-table',
  templateUrl: './rates-table.component.html',
  styleUrls: ['./rates-table.component.scss']
})
export class RatesTableComponent implements OnInit {
  myControl = new FormControl();
  options: any = [];
  currencies;
  filteredOptions: Observable<any>;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.getCurrencies();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: any): any {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getCurrencies() {
    const list = this.currencyService.getCurrencies();
    const currencies = [];
    for (let [key, value] of Object.entries(list)) {
      currencies.push(value.toString())
      this.options = currencies;
    }
  }

}
