import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CalendarService } from '../calendar.service';
import { CalendarItem } from '../calendarItem';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  @Input() calendarItemId: string;
  calendarItem: CalendarItem;

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.getCalendarItem();
  }

  getCalendarItem(): void {
    this.calendarService.getCalendarItem(this.calendarItemId)
      .subscribe(calendarItem => {
        this.calendarItem = calendarItem;
      });
  }
}
