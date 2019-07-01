import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WeatherItem } from '../weatherItem';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherItem: WeatherItem;

  //Hard-coded URL for testing only
  private roosterapiUrl = 'http://localhost:5000/api/weather/5d12089119929e6f30b737b2';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getWeatherItem();
  }

  getWeatherItem(): void {
    this.http.get<WeatherItem>(this.roosterapiUrl)
        .subscribe(weatherItem => this.weatherItem = weatherItem);
  }
}
