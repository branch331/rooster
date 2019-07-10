import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommuteItem } from '../commuteItem';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  commuteImage: Blob;
  commuteImagePath: string;

  key = 'Ar7d_Frhf9pNH2QUoWIK95AmRObxnE0DyD2Qxxufv6be0sCu2tzX_V_mksU2A4lY';

  roosterapiBaseUrl = 'http://localhost:5000/api/commute/';
  bingDistanceApiBaseUrl = 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

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
        this.getCommuteImage();
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

  getCommuteImage(): void {
    this.http.get("https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wp.0="
                  + this.commuteOriginCoordinates
                  + ";46;A&wp.1="
                  + this.commuteDestinationCoordinates
                  + ";46;B&key="
                  + this.key,
                  { responseType: 'blob' })
      .subscribe(commuteImage => {
        this.commuteImage = commuteImage;
        this.generateImageUrl(this.commuteImage);
      });
  }

  generateImageUrl(imageBlob: Blob): void {
    var reader = new FileReader();
    var base64data;

    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      base64data = reader.result;
      this.setAndSanitizeImageUrl(base64data);
    }
  }

  setAndSanitizeImageUrl(base64data: string): void {
    this.commuteImagePath = base64data;
    this.sanitizer.bypassSecurityTrustUrl(this.commuteImagePath);
  }
}
