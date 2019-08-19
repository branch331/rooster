import { Component, OnInit, Input } from '@angular/core';
import { DashboardItem } from '../dashboardItem';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardService } from '../dashboard.service';
import { WeatherItem } from '../weatherItem';
import { CommuteItem } from '../commuteItem';
import { CalendarItem } from '../calendarItem';
import { WeatherService } from '../weather.service'
import { CommuteService } from '../commute.service'
import { CalendarService } from '../calendar.service'

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.css']
})
export class DashboardDetailComponent implements OnInit {
  weatherItem = new WeatherItem();
  commuteItem = new CommuteItem();
  calendarItem = new CalendarItem();

  @Input() dashboardItem: DashboardItem;
  
  constructor(private route: ActivatedRoute, 
    private router: Router,
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

  onBackButton() {
    this.router.navigate(['/dashboard']);
  }
}
