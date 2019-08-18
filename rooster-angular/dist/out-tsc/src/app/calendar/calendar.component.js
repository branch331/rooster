import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { CalendarService } from '../calendar.service';
let CalendarComponent = class CalendarComponent {
    constructor(calendarService) {
        this.calendarService = calendarService;
    }
    ngOnInit() {
        this.getCalendarItem();
    }
    getCalendarItem() {
        this.calendarService.getCalendarItem(this.calendarItemId)
            .subscribe(calendarItem => {
            this.calendarItem = calendarItem;
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], CalendarComponent.prototype, "calendarItemId", void 0);
CalendarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-calendar',
        templateUrl: './calendar.component.html',
        styleUrls: ['./calendar.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [CalendarService])
], CalendarComponent);
export { CalendarComponent };
//# sourceMappingURL=calendar.component.js.map