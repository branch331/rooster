import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DashboardItem } from '../dashboardItem';
import { WeatherItem } from '../weatherItem';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  model = new DashboardItem();

  dashboardItemTypes = ['Weather', 'Commute'];

  private roosterapiUrl = 'http://localhost:5000/api/dashboard';
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  onSubmit() {
    console.log("submitted \n" 
    + this.model.dashboardItemName + "\n"
    + this.model.dashboardItemType);

    if (this.model.dashboardItemType == "Weather") {
      console.log("Weather item created.");
    }
    else if (this.model.dashboardItemType == "Commute") {
      console.log("Commute item created.")
    }

    this.http.post(this.roosterapiUrl, JSON.stringify(this.model), this.httpOptions)
      .subscribe(response => alert("complete"));
  }

  /*
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
  */
}
