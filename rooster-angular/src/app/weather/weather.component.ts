import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WeatherItem } from '../weatherItem';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {
  @Input() weatherItemId: string;
  weatherItem: WeatherItem;
  weatherCoordinates: string;
  weatherData : Object;

  constructor(private http: HttpClient, private weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeatherItem();
  }

  getWeatherItem(): void {
    this.weatherService.getWeatherItem(this.weatherItemId)
      .subscribe(weatherItem => {
        this.weatherItem = weatherItem;
        this.getWeatherData(weatherItem);
      });
  }

  getWeatherData(weatherItem: WeatherItem): void {
     this.weatherService.getDarkSkyData(weatherItem)
      .subscribe(weatherData => {
        this.weatherData = weatherData;
      });
  }
}
