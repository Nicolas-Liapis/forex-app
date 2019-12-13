import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForexComponent } from './tabs/forex/forex.component';
import { NotReadyComponent } from './tabs/not-ready/not-ready.component';
import { RatesTableComponent } from './tabs/rates-table/rates-table.component';

const routes: Routes = [
  { path: 'forex', component: ForexComponent },
  { path: 'stocks', component: NotReadyComponent},
  { path: 'crypto', component: NotReadyComponent},
  { path: 'rates', component: RatesTableComponent},
  { path: '', redirectTo: 'forex', pathMatch: 'full'},
  { path: '**', redirectTo: 'forex'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
