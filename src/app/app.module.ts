import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForexComponent } from './tabs/forex/forex.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { CurrencyService } from './services/currency.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartService } from './services/chart.service';
import { ChartComponent } from './tabs/forex/chart/chart.component';
import { TopNavComponent } from './tabs/top-nav/top-nav.component';
import { NotReadyComponent } from './tabs/not-ready/not-ready.component';

@NgModule({
  declarations: [
    AppComponent,
    ForexComponent,
    ChartComponent,
    TopNavComponent,
    NotReadyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [CurrencyService, ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
