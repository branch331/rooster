import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
let DashboardService = class DashboardService {
    constructor(http) {
        this.http = http;
        this.roosterApiDashboardUrl = 'https://localhost:5000/api/dashboard';
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }
    getDashboardItems() {
        return this.http.get(this.roosterApiDashboardUrl)
            .pipe(catchError(this.handleError));
    }
    getDashboardItem(id) {
        return this.http.get(this.roosterApiDashboardUrl + "/" + id)
            .pipe(catchError(this.handleError));
    }
    addDashboardItem(dashboardItem) {
        return this.http.post(this.roosterApiDashboardUrl, dashboardItem, this.httpOptions)
            .pipe(catchError(this.handleError));
    }
    updateDashboardItem(dashboardItem) {
        return this.http.put(this.roosterApiDashboardUrl, dashboardItem, this.httpOptions)
            .pipe(catchError(this.handleError));
    }
    deleteDashboardItem(dashboardItem) {
        const id = typeof dashboardItem === 'number' ? dashboardItem : dashboardItem.id;
        return this.http.delete(this.roosterApiDashboardUrl + '/' + id, this.httpOptions)
            .pipe(catchError(this.handleError));
    }
    handleError(error) {
        if (error.error instanceof ErrorEvent) {
            console.error('Error occurred: ', error.error.message);
        }
        else {
            console.error(`Backend returned code ${error.status},` +
                `body was: ${error.error}`);
        }
        return throwError('Error.');
    }
};
DashboardService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], DashboardService);
export { DashboardService };
//# sourceMappingURL=dashboard.service.js.map