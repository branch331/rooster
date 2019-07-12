import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DashboardItem } from '../dashboardItem';
import { WeatherItem } from '../weatherItem';
import { CommuteItem } from '../commuteItem';
import { throwError } from 'rxjs';
import { DashboardService } from '../dashboard.service'
import { WeatherService } from '../weather.service'
import { CommuteService } from '../commute.service'

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

  constructor(private dashboardService: DashboardService,
              private weatherService: WeatherService,
              private commuteSerivce: CommuteService) { }

  onSubmit() {

    if (this.dashboardItem.dashboardItemType == "Weather") {
      this.weatherService.addWeatherItem(this.weatherItem)
        .subscribe(createdWeatherItem => {
          this.dashboardItem.dashboardItemReferenceId = createdWeatherItem.id;
          this.createDashboardItem();
        });
    }
    else if (this.dashboardItem.dashboardItemType == "Commute") {
      this.commuteSerivce.addCommuteItem(this.commuteItem)
        .subscribe(responseObject => {
          let commuteItem = responseObject as CommuteItem;
          this.dashboardItem.dashboardItemReferenceId = commuteItem.id;
          this.createDashboardItem();
        });
    }
  }

  createDashboardItem(): void {
    this.dashboardService.addDashboardItem(this.dashboardItem)
      .subscribe(response => alert("complete"));
  }
}
