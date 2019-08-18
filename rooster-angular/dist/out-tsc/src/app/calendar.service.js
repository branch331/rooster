import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
let CalendarService = class CalendarService {
    constructor(http) {
        this.http = http;
        this.roosterApiCalendarUrl = 'https://localhost:5000/api/calendar';
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }
    getCalendarItems() {
        return this.http.get(this.roosterApiCalendarUrl)
            .pipe(catchError(this.handleError));
    }
    getCalendarItem(id) {
        return this.http.get(this.roosterApiCalendarUrl + "/" + id)
            .pipe(catchError(this.handleError));
    }
    addCalendarItem(calendarItem) {
        return this.http.post(this.roosterApiCalendarUrl, calendarItem, this.httpOptions)
            .pipe(catchError(this.handleError));
    }
    updateCalendarItem(calendarItem) {
        return this.http.put(this.roosterApiCalendarUrl, calendarItem, this.httpOptions)
            .pipe(catchError(this.handleError));
    }
    deleteCalendarItem(calendarItem) {
        const id = typeof calendarItem === 'number' ? calendarItem : calendarItem.id;
        return this.http.delete(this.roosterApiCalendarUrl + '/' + id, this.httpOptions)
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
CalendarService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], CalendarService);
export { CalendarService };
//# sourceMappingURL=calendar.service.js.map