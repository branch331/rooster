import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { DashboardItem } from '../dashboardItem';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { WeatherItem } from '../weatherItem';
import { CommuteItem } from '../commuteItem';
import { CalendarItem } from '../calendarItem';
import { WeatherService } from '../weather.service';
import { CommuteService } from '../commute.service';
import { CalendarService } from '../calendar.service';
let DashboardDetailComponent = class DashboardDetailComponent {
    constructor(route, dashboardService, weatherService, commuteService, calendarService) {
        this.route = route;
        this.dashboardService = dashboardService;
        this.weatherService = weatherService;
        this.commuteService = commuteService;
        this.calendarService = calendarService;
        this.weatherItem = new WeatherItem();
        this.commuteItem = new CommuteItem();
        this.calendarItem = new CalendarItem();
    }
    ngOnInit() {
        this.getDashboardItem();
    }
    getDashboardItem() {
        const id = this.route.snapshot.paramMap.get('id');
        this.dashboardService.getDashboardItem(id)
            .subscribe(dashboardItem => {
            this.dashboardItem = dashboardItem;
            this.getDashboardReferencedItem();
        });
    }
    getDashboardReferencedItem() {
        if (this.dashboardItem.dashboardItemType == "Weather") {
            this.weatherService.getWeatherItem(this.dashboardItem.dashboardItemReferenceId)
                .subscribe(returnedWeatherItem => {
                this.weatherItem = returnedWeatherItem;
            });
        }
        else if (this.dashboardItem.dashboardItemType == "Commute") {
            this.commuteService.getCommuteItem(this.dashboardItem.dashboardItemReferenceId)
                .subscribe(returnedCommuteItem => {
                this.commuteItem = returnedCommuteItem;
            });
        }
        else if (this.dashboardItem.dashboardItemType == "Calendar") {
            this.calendarService.getCalendarItem(this.dashboardItem.dashboardItemReferenceId)
                .subscribe(returnedCalendarItem => {
                this.calendarItem = returnedCalendarItem;
            });
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", DashboardItem)
], DashboardDetailComponent.prototype, "dashboardItem", void 0);
DashboardDetailComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dashboard-detail',
        templateUrl: './dashboard-detail.component.html',
        styleUrls: ['./dashboard-detail.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        DashboardService,
        WeatherService,
        CommuteService,
        CalendarService])
], DashboardDetailComponent);
export { DashboardDetailComponent };
//# sourceMappingURL=dashboard-detail.component.js.map