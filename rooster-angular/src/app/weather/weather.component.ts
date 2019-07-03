import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WeatherItem } from '../weatherItem';

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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getWeatherItem();
  }

  getWeatherItem(): void {
    this.http.get<WeatherItem>(this.roosterapiBaseUrl + this.weatherItemId)
      .subscribe(weatherItem => {
        this.weatherItem = weatherItem;
        this.weatherCoordinates = this.weatherItem.weatherItemLatitude + "," + this.weatherItem.weatherItemLongitude;
        this.getWeatherData();
      });
  }

  getWeatherData(): void {
    this.http.get<Object>(this.proxyUrl + this.darkSkyBaseUrl + this.weatherCoordinates)
      .subscribe(weatherData => {
        this.weatherData = weatherData;
      });
  }
}
