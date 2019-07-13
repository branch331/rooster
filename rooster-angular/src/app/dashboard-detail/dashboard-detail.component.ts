import { Component, OnInit, Input } from '@angular/core';
import { DashboardItem } from '../dashboardItem';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.css']
})
export class DashboardDetailComponent implements OnInit {

  @Input() dashboardItem: DashboardItem;
  
  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getDashboardItem();
  }

  getDashboardItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.dashboardService.getDashboardItem(id)
      .subscribe(dashboardItem => this.dashboardItem = dashboardItem);
    }
}
