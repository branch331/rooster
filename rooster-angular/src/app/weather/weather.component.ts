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

  private roosterapiBaseUrl = 'http://localhost:5000/api/weather/';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getWeatherItem();
  }

  getWeatherItem(): void {
    this.http.get<WeatherItem>(this.roosterapiBaseUrl + this.weatherItemId)
        .subscribe(weatherItem => this.weatherItem = weatherItem);
  }
}
