import { Injectable } from '@angular/core';
import { WeatherItem } from './weatherItem';
import { CommuteItem } from './commuteItem';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private roosterApiWeatherUrl = 'http://localhost:5000/api/weather';
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  private darkSkyBaseUrl = 'https://api.darksky.net/forecast/1173017e849e9872e6537772ce11609c/';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getWeatherItems(): Observable<WeatherItem[]> {
    return this.http.get<WeatherItem[]>(this.roosterApiWeatherUrl)
      .pipe(
        catchError(this.handleError)
      )
  }

  getWeatherItem(id: string): Observable<WeatherItem> {
    return this.http.get<WeatherItem>(this.roosterApiWeatherUrl + "/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  addWeatherItem(weatherItem: WeatherItem): Observable<WeatherItem> {
    return this.http.post<WeatherItem>(this.roosterApiWeatherUrl, weatherItem, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateWeatherItem(weatherItem: WeatherItem): Observable<any> {
    return this.http.put(this.roosterApiWeatherUrl, weatherItem, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteWeatherItem(weatherItem: WeatherItem | number): Observable<WeatherItem> {
    const id = typeof weatherItem === 'number' ? weatherItem: weatherItem.id;

    return this.http.delete<WeatherItem>(this.roosterApiWeatherUrl + '/' + id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDarkSkyData(weatherItem: WeatherItem): Object {
    return this.http.get<Object>(this.proxyUrl 
      + this.darkSkyBaseUrl 
      + weatherItem.weatherItemLatitude 
      + ',' 
      + weatherItem.weatherItemLongitude)
        .pipe(
          catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error occurred: ', error.error.message);
    }
    else {
      console.error(`Backend returned code ${error.status},` +
      `body was: ${error.error}` );
    }

    return throwError('Error.');
  }
}
