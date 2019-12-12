import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForexComponent } from './tabs/forex/forex.component';
import { NotReadyComponent } from './tabs/not-ready/not-ready.component';

const routes: Routes = [
  { path: 'forex', component: ForexComponent },
  { path: 'stocks', component: NotReadyComponent},
  { path: 'crypto', component: NotReadyComponent},
  { path: '', redirectTo: 'forex', pathMatch: 'full'},
  { path: '**', redirectTo: 'forex'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
