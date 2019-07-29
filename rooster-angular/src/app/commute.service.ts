import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommuteItem } from './commuteItem';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CommuteService {

  private commuteImagePath = null;

  private roosterApiCommuteUrl = 'https://localhost:5000/api/commute';
  private key = 'Ar7d_Frhf9pNH2QUoWIK95AmRObxnE0DyD2Qxxufv6be0sCu2tzX_V_mksU2A4lY';
  private bingDistanceApiBaseUrl = 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getCommuteItems(): Observable<CommuteItem[]> {
    return this.http.get<CommuteItem[]>(this.roosterApiCommuteUrl)
      .pipe(
        catchError(this.handleError)
      )
  }

  getCommuteItem(id: string): Observable<CommuteItem> {
    return this.http.get<CommuteItem>(this.roosterApiCommuteUrl + "/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  addCommuteItem(commuteItem: CommuteItem): Observable<CommuteItem> {
    return this.http.post<CommuteItem>(this.roosterApiCommuteUrl, commuteItem, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCommuteItem(commuteItem: CommuteItem): Observable<any> {
    return this.http.put(this.roosterApiCommuteUrl, commuteItem, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCommuteItem(commuteItem: CommuteItem | number): Observable<CommuteItem> {
    const id = typeof commuteItem === 'number' ? commuteItem: commuteItem.id;

    return this.http.delete<CommuteItem>(this.roosterApiCommuteUrl + '/' + id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCommuteData(commuteItem: CommuteItem): Observable<Object> {
    return this.http.get<Object>(this.bingDistanceApiBaseUrl 
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
        .pipe(
          catchError(this.handleError)
        );
  }

  getCommuteImage(commuteItem: CommuteItem): Observable<Blob> {
    return this.http.get("https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wp.0="
    + commuteItem.commuteOriginLatitude
    + ','
    + commuteItem.commuteOriginLongitude
    + ";46;A&wp.1="
    + commuteItem.commuteDestinationLatitude
    + ','
    + commuteItem.commuteDestinationLongitude
    + ";46;B&key="
    + this.key,
    { responseType: 'blob' })
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
