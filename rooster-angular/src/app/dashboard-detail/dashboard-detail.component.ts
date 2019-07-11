import { Component, OnInit, Input } from '@angular/core';
import { DashboardItem } from '../dashboardItem';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.css']
})
export class DashboardDetailComponent implements OnInit {

  @Input() dashboardItem: DashboardItem;

  private roosterapiUrl = 'http://localhost:5000/api/dashboard/';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getDashboardItem();
  }

  getDashboardItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<DashboardItem>(this.roosterapiUrl + id)
      .subscribe(dashboardItem => this.dashboardItem = dashboardItem);
    }
}
