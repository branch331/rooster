import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../weather.service';
let WeatherComponent = class WeatherComponent {
    constructor(http, weatherService) {
        this.http = http;
        this.weatherService = weatherService;
    }
    ngOnInit() {
        this.getWeatherItem();
    }
    getWeatherItem() {
        this.weatherService.getWeatherItem(this.weatherItemId)
            .subscribe(weatherItem => {
            this.weatherItem = weatherItem;
            this.getWeatherData(weatherItem);
        });
    }
    getWeatherData(weatherItem) {
        this.weatherService.getDarkSkyData(weatherItem)
            .subscribe(weatherData => {
            this.weatherData = weatherData;
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], WeatherComponent.prototype, "weatherItemId", void 0);
WeatherComponent = tslib_1.__decorate([
    Component({
        selector: 'app-weather',
        templateUrl: './weather.component.html',
        styleUrls: ['./weather.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, WeatherService])
], WeatherComponent);
export { WeatherComponent };
//# sourceMappingURL=weather.component.js.map