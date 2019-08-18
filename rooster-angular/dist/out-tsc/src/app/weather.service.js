import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
let WeatherService = class WeatherService {
    constructor(http) {
        this.http = http;
        this.roosterApiWeatherUrl = 'https://localhost:5000/api/weather';
        this.proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        this.darkSkyBaseUrl = 'https://api.darksky.net/forecast/1173017e849e9872e6537772ce11609c/';
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }
    getWeatherItems() {
        return this.http.get(this.roosterApiWeatherUrl)
            .pipe(catchError(this.handleError));
    }
    getWeatherItem(id) {
        return this.http.get(this.roosterApiWeatherUrl + "/" + id)
            .pipe(catchError(this.handleError));
    }
    addWeatherItem(weatherItem) {
        return this.http.post(this.roosterApiWeatherUrl, weatherItem, this.httpOptions)
            .pipe(catchError(this.handleError));
    }
    updateWeatherItem(weatherItem) {
        return this.http.put(this.roosterApiWeatherUrl, weatherItem, this.httpOptions)
            .pipe(catchError(this.handleError));
    }
    deleteWeatherItem(weatherItem) {
        const id = typeof weatherItem === 'number' ? weatherItem : weatherItem.id;
        return this.http.delete(this.roosterApiWeatherUrl + '/' + id, this.httpOptions)
            .pipe(catchError(this.handleError));
    }
    getDarkSkyData(weatherItem) {
        return this.http.get(this.proxyUrl
            + this.darkSkyBaseUrl
            + weatherItem.weatherItemLatitude
            + ','
            + weatherItem.weatherItemLongitude)
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
WeatherService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], WeatherService);
export { WeatherService };
//# sourceMappingURL=weather.service.js.map