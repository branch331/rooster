import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DashboardItem } from '../dashboardItem';
import { WeatherItem } from '../weatherItem';
import { CommuteItem } from '../commuteItem';
import { CalendarItem } from '../calendarItem';
import { DashboardService } from '../dashboard.service';
import { WeatherService } from '../weather.service';
import { CommuteService } from '../commute.service';
import { CalendarService } from '../calendar.service';
let CreateComponent = class CreateComponent {
    constructor(dashboardService, weatherService, commuteService, calendarService) {
        this.dashboardService = dashboardService;
        this.weatherService = weatherService;
        this.commuteService = commuteService;
        this.calendarService = calendarService;
        this.dashboardItem = new DashboardItem();
        this.weatherItem = new WeatherItem();
        this.commuteItem = new CommuteItem();
        this.calendarItem = new CalendarItem();
        this.dashboardItemTypes = ['Weather', 'Commute', 'Calendar'];
    }
    onSubmit() {
        if (this.dashboardItem.dashboardItemType == "Weather") {
            this.weatherService.addWeatherItem(this.weatherItem)
                .subscribe(createdWeatherItem => {
                this.dashboardItem.dashboardItemReferenceId = createdWeatherItem.id;
                this.createDashboardItem();
            });
        }
        else if (this.dashboardItem.dashboardItemType == "Commute") {
            this.commuteService.addCommuteItem(this.commuteItem)
                .subscribe(responseObject => {
                let commuteItem = responseObject;
                this.dashboardItem.dashboardItemReferenceId = commuteItem.id;
                this.createDashboardItem();
            });
        }
        else if (this.dashboardItem.dashboardItemType == "Calendar") {
            this.calendarService.addCalendarItem(this.calendarItem)
                .subscribe(responseObject => {
                let calendarItem = responseObject;
                this.dashboardItem.dashboardItemReferenceId = calendarItem.id;
                this.createDashboardItem();
            });
        }
    }
    createDashboardItem() {
        this.dashboardService.addDashboardItem(this.dashboardItem)
            .subscribe(response => alert("Added dashboard item"));
    }
};
CreateComponent = tslib_1.__decorate([
    Component({
        selector: 'app-create',
        templateUrl: './create.component.html',
        styleUrls: ['./create.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [DashboardService,
        WeatherService,
        CommuteService,
        CalendarService])
], CreateComponent);
export { CreateComponent };
//# sourceMappingURL=create.component.js.map