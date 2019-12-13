import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currencies:any = [];
  res;
  private key = '74GF58GZ5KTOOD1Q';
  constructor(private http: HttpClient) {}

  getCurrencies(): Observable < any > {
    // caching currency list
    if (this.currencies.length === 0) {
      const currenciesUrl = 'https://openexchangerates.org/api/currencies.json';
      const currencyList = this.http.get < any > (currenciesUrl).pipe(
        publishReplay(1),
        refCount()
      );
      currencyList.subscribe(data => {
        for (let i in data) {
          this.currencies.push([i, data[i]]);
        }
      });
    }
      return this.currencies;
  }

  getFx(from: string, to: string): Observable < any > {
    // tslint:disable-next-line: max-line-length
    const apiUrl = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${this.key}&datatype=json`;
    return this.http.get < any > (apiUrl);
  }

}
