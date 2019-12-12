import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForexComponent } from './tabs/forex/forex.component';

const routes: Routes = [
  { path: 'forex', component: ForexComponent },
  { path: '', redirectTo: 'forex', pathMatch: 'full'},
  { path: '**', redirectTo: 'forex'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
