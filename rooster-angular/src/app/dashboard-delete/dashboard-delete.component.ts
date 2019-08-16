import { Component, OnInit, Input } from '@angular/core';
import { DashboardItem } from '../dashboardItem';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-delete',
  templateUrl: './dashboard-delete.component.html',
  styleUrls: ['./dashboard-delete.component.css']
})
export class DashboardDeleteComponent implements OnInit {

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
