import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommuteItem } from './commuteItem';

@Injectable({
  providedIn: 'root'
})
export class CommuteService {

  private roosterApiCommuteUrl = 'http://localhost:5000/api/commute';
  
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

  deleteCommuteItem(dashboardItem: CommuteItem | number): Observable<CommuteItem> {
    const id = typeof dashboardItem === 'number' ? dashboardItem: dashboardItem.id;

    return this.http.delete<CommuteItem>(this.roosterApiCommuteUrl + '/' + id, this.httpOptions)
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
