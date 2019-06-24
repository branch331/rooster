import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardItem } from '../dashboardItem';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardItems: DashboardItem[];

  private roosterapiUrl = 'http://localhost:5000/api/dashboard';
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getDashboardItems();
  }

  getDashboardItems(): void {
    this.http.get<DashboardItem[]>(this.roosterapiUrl)
        .subscribe(dashboardItems => this.dashboardItems = dashboardItems);
  }
}
