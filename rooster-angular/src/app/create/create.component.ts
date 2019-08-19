import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DashboardItem } from '../dashboardItem';
import { WeatherItem } from '../weatherItem';
import { CommuteItem } from '../commuteItem';
import { CalendarItem } from '../calendarItem';
import { throwError } from 'rxjs';
import { DashboardService } from '../dashboard.service'
import { WeatherService } from '../weather.service'
import { CommuteService } from '../commute.service'
import { CalendarService } from '../calendar.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  dashboardItem = new DashboardItem();
  weatherItem = new WeatherItem();
  commuteItem = new CommuteItem();
  calendarItem = new CalendarItem();

  dashboardItemTypes = ['Weather', 'Commute', 'Calendar'];

  constructor(private router: Router,
              private dashboardService: DashboardService,
              private weatherService: WeatherService,
              private commuteService: CommuteService,
              private calendarService: CalendarService) { }

  onSubmit() {

    if (this.dashboardItem.dashboardItemType == "Weather") {
      this.weatherService.addWeatherItem(this.weatherItem)
        .subscribe(createdWeatherItem => {
          this.dashboardItem.dashboardItemReferenceId = createdWeatherItem.id;
          this.createDashboardItem();
        });
    }
    else if (this.dashboardItem.dashboardItemType == "Commute") {
      this.commuteService.addCommuteItem(this.commuteItem)
        .subscribe(responseObject => {
          let commuteItem = responseObject as CommuteItem;
          this.dashboardItem.dashboardItemReferenceId = commuteItem.id;
          this.createDashboardItem();
        });
    }
    else if (this.dashboardItem.dashboardItemType == "Calendar") {
      this.calendarService.addCalendarItem(this.calendarItem)
        .subscribe(responseObject => {
          let calendarItem = responseObject as CalendarItem;
          this.dashboardItem.dashboardItemReferenceId = calendarItem.id;
          this.createDashboardItem();
        })
    }
  }

  createDashboardItem(): void {
    this.dashboardService.addDashboardItem(this.dashboardItem)
      .subscribe(response => {
        console.log("Added dashboard item");
        this.router.navigate(['/dashboard']);
      });
  }

  onCancel() {
    this.router.navigate(['/dashboard']);
  }
}
