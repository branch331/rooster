import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DashboardItem } from '../dashboardItem';
import { WeatherItem } from '../weatherItem';
import { CommuteItem } from '../commuteItem';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  dashboardItem = new DashboardItem();
  weatherItem = new WeatherItem();
  commuteItem = new CommuteItem();

  dashboardItemTypes = ['Weather', 'Commute'];

  private roosterapiBaseUrl = 'http://localhost:5000/api/';
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  onSubmit() {
    console.log("submitted \n" 
    + this.dashboardItem.dashboardItemName + "\n"
    + this.dashboardItem.dashboardItemType);

    if (this.dashboardItem.dashboardItemType == "Weather") {
      console.log("Weather item created: \n"
      + this.weatherItem.weatherItemName + "\n"
      + this.weatherItem.weatherItemLatitude + "\n"
      + this.weatherItem.weatherItemLongitude);

      this.http.post(this.roosterapiBaseUrl + "weather", this.weatherItem, this.httpOptions)
        .subscribe(responseObject => {
          let weatherItem = responseObject as WeatherItem;
          this.dashboardItem.dashboardItemReferenceId = weatherItem.id;
          this.createDashboardItem();
        });
    }
    else if (this.dashboardItem.dashboardItemType == "Commute") {
      console.log("Commute item created: \n"
      + this.commuteItem.commuteItemName + "\n"
      + this.commuteItem.commuteOriginName + "\n"
      + this.commuteItem.commuteOriginLatitude + "\n"
      + this.commuteItem.commuteOriginLongitude + "\n"
      + this.commuteItem.commuteDestinationName + "\n"
      + this.commuteItem.commuteDestinationLatitude + "\n"
      + this.commuteItem.commuteDestinationLongitude);

      this.http.post(this.roosterapiBaseUrl + "commute", this.commuteItem, this.httpOptions)
      .subscribe(responseObject => {
        let commuteItem = responseObject as CommuteItem;
        this.dashboardItem.dashboardItemReferenceId = commuteItem.id;
        this.createDashboardItem();
      });
    }
  }

  createDashboardItem(): void {
    this.http.post(this.roosterapiBaseUrl + 'dashboard', JSON.stringify(this.dashboardItem), this.httpOptions)
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
