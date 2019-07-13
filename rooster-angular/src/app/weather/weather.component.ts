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

  private roosterapiBaseUrl = 'http://localhost:5000/api/weather/';
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  private darkSkyBaseUrl = 'https://api.darksky.net/forecast/1173017e849e9872e6537772ce11609c/';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  };

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
