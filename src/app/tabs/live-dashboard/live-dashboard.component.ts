import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-live-dashboard',
  templateUrl: './live-dashboard.component.html',
  styleUrls: ['./live-dashboard.component.scss']
})
export class LiveDashboardComponent implements OnInit {

  liveFx: number;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
  }


  getLiveFx(from: string, to: string) {
    this.currencyService.getRealTimeFx('USD', 'EUR').subscribe(
      res => {
        let a = res['Realtime Currency Exchange Rate'];
        this.liveFx = Number(a['5. Exchange Rate']);
      }
    );
  }
}
