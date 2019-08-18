import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
let DashboardComponent = class DashboardComponent {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    ngOnInit() {
        this.getDashboardItems();
    }
    getDashboardItems() {
        this.dashboardService.getDashboardItems()
            .subscribe(dashboardItems => this.dashboardItems = dashboardItems);
    }
};
DashboardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [DashboardService])
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map