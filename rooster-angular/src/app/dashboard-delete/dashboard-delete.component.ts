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
  selector: 'app-dashboard-delete',
  templateUrl: './dashboard-delete.component.html',
  styleUrls: ['./dashboard-delete.component.css']
})
export class DashboardDeleteComponent implements OnInit {

  @Input() dashboardItem: DashboardItem;

  dashboardItemType: string;
  dashboardItemReferenceId: string;

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
      .subscribe(dashboardItem => this.dashboardItem = dashboardItem);
    }

  onDelete() {
    this.dashboardService.deleteDashboardItem(this.dashboardItem)
      .subscribe(responseObject => {
        this.dashboardItemReferenceId = this.dashboardItem.dashboardItemReferenceId;
        this.dashboardItemType = this.dashboardItem.dashboardItemType;
        console.log("Dashboard item deleted");
        this.deleteReferencedItem();
      });
  }

  deleteReferencedItem(): void {
    switch(this.dashboardItemType) {
      case "Weather": { 
        this.weatherService.deleteWeatherItem(this.dashboardItemReferenceId)
          .subscribe(responseObject => console.log("Weather item deleted."));
          break;
      }
      case "Commute": {
        this.commuteService.deleteCommuteItem(this.dashboardItemReferenceId)
          .subscribe(responseObject => console.log("Commute item deleted."));
          break;
      }
      case "Calendar": {
        this.calendarService.deleteCalendarItem(this.dashboardItemReferenceId)
          .subscribe(responseObject => console.log("Calendar item deleted."));
          break;
      }
      case "": {
        console.log("No object found from dashboardItemReferenceId; nothing deleted.");
        break;
      }
    }

    this.router.navigate(['/dashboard']);
  }

  onCancel() {
    this.router.navigate(['/dashboard']);
  }
}
