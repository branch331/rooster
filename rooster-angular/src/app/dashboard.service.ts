import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DashboardItem } from './dashboardItem';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private roosterApiDashboardUrl = 'https://localhost:5000/api/dashboard';
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getDashboardItems(): Observable<DashboardItem[]> {
    return this.http.get<DashboardItem[]>(this.roosterApiDashboardUrl)
      .pipe(
        catchError(this.handleError)
      )
  }

  getDashboardItem(id: string): Observable<DashboardItem> {
    return this.http.get<DashboardItem>(this.roosterApiDashboardUrl + "/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  addDashboardItem(dashboardItem: DashboardItem): Observable<DashboardItem> {
    return this.http.post<DashboardItem>(this.roosterApiDashboardUrl, dashboardItem, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateDashboardItem(dashboardItem: DashboardItem): Observable<any> {
    return this.http.put(this.roosterApiDashboardUrl + '/' + dashboardItem.id, dashboardItem, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteDashboardItem(dashboardItem: DashboardItem | number): Observable<DashboardItem> {
    const id = typeof dashboardItem === 'number' ? dashboardItem: dashboardItem.id;

    return this.http.delete<DashboardItem>(this.roosterApiDashboardUrl + '/' + id, this.httpOptions)
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
