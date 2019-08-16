import { Component, OnInit, Input } from '@angular/core';
import { DashboardItem } from '../dashboardItem';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardService } from '../dashboard.service';
import { WeatherItem } from '../weatherItem';
import { CommuteItem } from '../commuteItem';
import { CalendarItem } from '../calendarItem';
import { throwError } from 'rxjs';
import { WeatherService } from '../weather.service'
import { CommuteService } from '../commute.service'
import { CalendarService } from '../calendar.service'

@Component({
  selector: 'app-dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.css']
})
export class DashboardEditComponent implements OnInit {
  @Input() dashboardItem: DashboardItem;

  weatherItem = new WeatherItem();
  commuteItem = new CommuteItem();
  calendarItem = new CalendarItem();

  dashboardItemTypes = ['Weather', 'Commute', 'Calendar'];
  
  constructor(private route: ActivatedRoute, 
    private dashboardService: DashboardService,    
    private weatherService: WeatherService,
    private commuteService: CommuteService,
    private calendarService: CalendarService) { }

  ngOnInit() {
    this.getDashboardItem();
  }

  getDashboardItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.dashboardService.getDashboardItem(id)
      .subscribe(dashboardItem => {
        this.dashboardItem = dashboardItem;
        this.getDashboardReferencedItem();
      });
    }

  getDashboardReferencedItem(): void {
    if (this.dashboardItem.dashboardItemType == "Weather") {
      this.weatherService.getWeatherItem(this.dashboardItem.dashboardItemReferenceId)
        .subscribe(returnedWeatherItem => {
          this.weatherItem = returnedWeatherItem;
        });
    }
    else if (this.dashboardItem.dashboardItemType == "Commute") {
      this.commuteService.getCommuteItem(this.dashboardItem.dashboardItemReferenceId)
        .subscribe(returnedCommuteItem => {
          this.commuteItem = returnedCommuteItem;
        });
    }
    else if (this.dashboardItem.dashboardItemType == "Calendar") {
      this.calendarService.getCalendarItem(this.dashboardItem.dashboardItemReferenceId)
        .subscribe(returnedCalendarItem => {
          this.calendarItem = returnedCalendarItem;
        });
    }
  }
}
