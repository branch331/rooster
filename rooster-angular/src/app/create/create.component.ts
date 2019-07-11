import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardItem } from '../dashboardItem';
import { WeatherItem } from '../weatherItem';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  model = new DashboardItem();

  dashboardItemTypes = ['Weather', 'Commute'];

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
  }
}
