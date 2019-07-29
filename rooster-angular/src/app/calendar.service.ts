import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CalendarItem } from './calendarItem';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private roosterApiCalendarUrl = 'https://localhost:5000/api/calendar';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getCalendarItems(): Observable<CalendarItem[]> {
    return this.http.get<CalendarItem[]>(this.roosterApiCalendarUrl)
      .pipe(
        catchError(this.handleError)
      )
  }

  getCalendarItem(id: string): Observable<CalendarItem> {
    return this.http.get<CalendarItem>(this.roosterApiCalendarUrl + "/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  addCalendarItem(calendarItem: CalendarItem): Observable<CalendarItem> {
    return this.http.post<CalendarItem>(this.roosterApiCalendarUrl, calendarItem, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCalendarItem(calendarItem: CalendarItem): Observable<any> {
    return this.http.put(this.roosterApiCalendarUrl, calendarItem, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCalendarItem(calendarItem: CalendarItem | number): Observable<CalendarItem> {
    const id = typeof calendarItem === 'number' ? calendarItem: calendarItem.id;

    return this.http.delete<CalendarItem>(this.roosterApiCalendarUrl + '/' + id, this.httpOptions)
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
