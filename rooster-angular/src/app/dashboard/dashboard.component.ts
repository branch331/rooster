import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardItem } from '../dashboardItem';
import { Observable, of } from 'rxjs';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardItems: DashboardItem[];
  
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getDashboardItems();
  }

  getDashboardItems(): void {
    this.dashboardService.getDashboardItems()
      .subscribe(dashboardItems => this.dashboardItems = dashboardItems);
  }
}
