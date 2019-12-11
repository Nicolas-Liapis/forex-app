import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  
  private key = '74GF58GZ5KTOOD1Q';

  constructor(private http: HttpClient) { }

  getDataMonth(from: string, to: string): Observable < any > {
    // tslint:disable-next-line: max-line-length
    const apiUrl = `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${from}&to_symbol=${to}&apikey=${this.key}&datatype=json`
    return this.http.get < any > (apiUrl);
  }

}
