import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommuteItem } from '../commuteItem';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CommuteService } from '../commute.service';
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

  constructor(private commuteService: CommuteService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getCommuteItem();
  }

  getCommuteItem(): void {
    this.commuteService.getCommuteItem(this.commuteItemId)
      .subscribe(commuteItem => {
        this.commuteItem = commuteItem;
        this.commuteOriginCoordinates = this.commuteItem.commuteOriginLatitude + "," + this.commuteItem.commuteOriginLongitude;
        this.commuteDestinationCoordinates = this.commuteItem.commuteDestinationLatitude + "," + this.commuteItem.commuteDestinationLongitude;
        this.getCommuteData(commuteItem);
        this.getCommuteImage(commuteItem);
      });
  }

  getCommuteData(commuteItem: CommuteItem): void {
    this.commuteService.getCommuteData(commuteItem)
      .subscribe(commuteData => {
        this.commuteData = commuteData;
      });
  }

  getCommuteImage(commuteItem: CommuteItem): void {
    this.commuteService.getCommuteImage(commuteItem)
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
