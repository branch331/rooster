import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeatherComponent } from './weather/weather.component';
import { CommuteComponent } from './commute/commute.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateComponent } from './create/create.component';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardDeleteComponent } from './dashboard-delete/dashboard-delete.component';
import { DashboardEditComponent } from './dashboard-edit/dashboard-edit.component';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            DashboardComponent,
            WeatherComponent,
            CommuteComponent,
            CreateComponent,
            DashboardDetailComponent,
            CalendarComponent,
            DashboardDeleteComponent,
            DashboardEditComponent
        ],
        imports: [
            BrowserModule,
            HttpClientModule,
            AppRoutingModule,
            FormsModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map