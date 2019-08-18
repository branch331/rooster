import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
let CommuteService = class CommuteService {
    constructor(http) {
        this.http = http;
        this.commuteImagePath = null;
        this.roosterApiCommuteUrl = 'https://localhost:5000/api/commute';
        this.key = 'Ar7d_Frhf9pNH2QUoWIK95AmRObxnE0DyD2Qxxufv6be0sCu2tzX_V_mksU2A4lY';
        this.bingDistanceApiBaseUrl = 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?';
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }
    getCommuteItems() {
        return this.http.get(this.roosterApiCommuteUrl)
            .pipe(catchError(this.handleError));
    }
    getCommuteItem(id) {
        return this.http.get(this.roosterApiCommuteUrl + "/" + id)
            .pipe(catchError(this.handleError));
    }
    addCommuteItem(commuteItem) {
        return this.http.post(this.roosterApiCommuteUrl, commuteItem, this.httpOptions)
            .pipe(catchError(this.handleError));
    }
    updateCommuteItem(commuteItem) {
        return this.http.put(this.roosterApiCommuteUrl, commuteItem, this.httpOptions)
            .pipe(catchError(this.handleError));
    }
    deleteCommuteItem(commuteItem) {
        const id = typeof commuteItem === 'number' ? commuteItem : commuteItem.id;
        return this.http.delete(this.roosterApiCommuteUrl + '/' + id, this.httpOptions)
            .pipe(catchError(this.handleError));
    }
    getCommuteData(commuteItem) {
        return this.http.get(this.bingDistanceApiBaseUrl
            + "origins="
            + commuteItem.commuteOriginLatitude
            + ","
            + commuteItem.commuteOriginLongitude
            + "&destinations="
            + commuteItem.commuteDestinationLatitude
            + ","
            + commuteItem.commuteDestinationLongitude
            + "&travelMode=driving&key="
            + this.key)
            .pipe(catchError(this.handleError));
    }
    getCommuteImage(commuteItem) {
        return this.http.get("https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wp.0="
            + commuteItem.commuteOriginLatitude
            + ','
            + commuteItem.commuteOriginLongitude
            + ";46;A&wp.1="
            + commuteItem.commuteDestinationLatitude
            + ','
            + commuteItem.commuteDestinationLongitude
            + ";46;B&key="
            + this.key, { responseType: 'blob' })
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
CommuteService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], CommuteService);
export { CommuteService };
//# sourceMappingURL=commute.service.js.map