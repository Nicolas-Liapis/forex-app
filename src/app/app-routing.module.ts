import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForexComponent } from './tabs/forex/forex.component';
import { NotReadyComponent } from './tabs/not-ready/not-ready.component';
import { LiveDashboardComponent } from './tabs/live-dashboard/live-dashboard.component';

const routes: Routes = [
  { path: 'forex', component: ForexComponent },
  { path: 'live', component: LiveDashboardComponent},
  { path: '', redirectTo: 'forex', pathMatch: 'full'},
  { path: '**', redirectTo: 'forex'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
