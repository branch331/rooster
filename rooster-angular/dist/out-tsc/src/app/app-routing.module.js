import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { DashboardDeleteComponent } from './dashboard-delete/dashboard-delete.component';
import { DashboardEditComponent } from './dashboard-edit/dashboard-edit.component';
const routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard/new', component: CreateComponent },
    { path: 'dashboard/:id', component: DashboardDetailComponent },
    { path: 'dashboard/delete/:id', component: DashboardDeleteComponent },
    { path: 'dashboard/edit/:id', component: DashboardEditComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        declarations: [],
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map