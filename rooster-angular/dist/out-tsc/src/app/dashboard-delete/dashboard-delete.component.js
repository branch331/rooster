import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { DashboardItem } from '../dashboardItem';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';
let DashboardDeleteComponent = class DashboardDeleteComponent {
    constructor(route, dashboardService) {
        this.route = route;
        this.dashboardService = dashboardService;
    }
    ngOnInit() {
        this.getDashboardItem();
    }
    getDashboardItem() {
        const id = this.route.snapshot.paramMap.get('id');
        this.dashboardService.getDashboardItem(id)
            .subscribe(dashboardItem => this.dashboardItem = dashboardItem);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", DashboardItem)
], DashboardDeleteComponent.prototype, "dashboardItem", void 0);
DashboardDeleteComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dashboard-delete',
        templateUrl: './dashboard-delete.component.html',
        styleUrls: ['./dashboard-delete.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute, DashboardService])
], DashboardDeleteComponent);
export { DashboardDeleteComponent };
//# sourceMappingURL=dashboard-delete.component.js.map