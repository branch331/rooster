import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommuteItem } from '../commuteItem';

@Component({
  selector: 'app-commute',
  templateUrl: './commute.component.html',
  styleUrls: ['./commute.component.css']
})
export class CommuteComponent implements OnInit {
  @Input() commuteItemId: string;
  commuteItem: CommuteItem;
  commuteOriginCoordinates: string;
  commuteDestinationCoordinates: string;
  commuteData: object;
  key = 'Ar7d_Frhf9pNH2QUoWIK95AmRObxnE0DyD2Qxxufv6be0sCu2tzX_V_mksU2A4lY';

  roosterapiBaseUrl = 'http://localhost:5000/api/commute/';
  bingDistanceApiBaseUrl = 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?';

  //origins=30.428838,-97.659316&destinations=30.407825,-97.726570&travelMode=driving&key=Ar7d_Frhf9pNH2QUoWIK95AmRObxnE0DyD2Qxxufv6be0sCu2tzX_V_mksU2A4lY'

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCommuteItem();
  }

  getCommuteItem(): void {
    this.http.get<CommuteItem>(this.roosterapiBaseUrl + this.commuteItemId)
      .subscribe(commuteItem => {
        this.commuteItem = commuteItem;
        this.commuteOriginCoordinates = this.commuteItem.commuteOriginLatitude + "," + this.commuteItem.commuteOriginLongitude;
        this.commuteDestinationCoordinates = this.commuteItem.commuteDestinationLatitude + "," + this.commuteItem.commuteDestinationLongitude;
        this.getCommuteData();
      });
  }

  getCommuteData(): void {
    this.http.get<Object>(this.bingDistanceApiBaseUrl 
                                    + "origins=" 
                                    + this.commuteOriginCoordinates
                                    + "&destinations="
                                    + this.commuteDestinationCoordinates
                                    + "&travelMode=driving&key="
                                    + this.key)
      .subscribe(commuteData => {
        this.commuteData = commuteData;
      });
  }

}
