import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges, SimpleChange } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnChanges {

  formControl = new FormControl();
  Options: any = [];
  filteredOptions: Observable<any>;
  currencyList;

  @Output() currencyChange = new EventEmitter<string>();
  @Input() currency;

  constructor(private currencyService: CurrencyService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const change: SimpleChange = changes.currency;
    if (change) {
      this.formControl.patchValue(this.currency);
    }
  }

  ngOnInit() {
    this.currencyList = this.currencyService.getCurrencies();
  }


  onCurrency(currency: string) {
    this.currencyChange.emit(currency);
  }

  private _Filter(value: any): any {
    const filterValue = value.toLowerCase();

    return this.Options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getCurrencies() {
    const currencies = [];
    for (let [key, value] of Object.entries(this.currencyList)) {
      currencies.push(value.toString());
      this.Options = currencies;
    }
    this.filteredOptions = this.formControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._Filter(value))
    );
  }

}
