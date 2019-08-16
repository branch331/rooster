import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CommuteComponent } from './commute/commute.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeatherComponent } from './weather/weather.component';
import { CreateComponent } from './create/create.component';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { DashboardDeleteComponent } from './dashboard-delete/dashboard-delete.component';
import { DashboardEditComponent } from './dashboard-edit/dashboard-edit.component';
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'dashboard/new', component: CreateComponent},
  { path: 'dashboard/:id', component: DashboardDetailComponent},
  { path: 'dashboard/delete/:id', component: DashboardDeleteComponent},
  { path: 'dashboard/edit/:id', component: DashboardEditComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
