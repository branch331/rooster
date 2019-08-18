import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { CommuteService } from '../commute.service';
import { DomSanitizer } from '@angular/platform-browser';
let CommuteComponent = class CommuteComponent {
    constructor(commuteService, sanitizer) {
        this.commuteService = commuteService;
        this.sanitizer = sanitizer;
    }
    ngOnInit() {
        this.getCommuteItem();
    }
    getCommuteItem() {
        this.commuteService.getCommuteItem(this.commuteItemId)
            .subscribe(commuteItem => {
            this.commuteItem = commuteItem;
            this.commuteOriginCoordinates = this.commuteItem.commuteOriginLatitude + "," + this.commuteItem.commuteOriginLongitude;
            this.commuteDestinationCoordinates = this.commuteItem.commuteDestinationLatitude + "," + this.commuteItem.commuteDestinationLongitude;
            this.getCommuteData(commuteItem);
            this.getCommuteImage(commuteItem);
        });
    }
    getCommuteData(commuteItem) {
        this.commuteService.getCommuteData(commuteItem)
            .subscribe(commuteData => {
            this.commuteData = commuteData;
        });
    }
    getCommuteImage(commuteItem) {
        this.commuteService.getCommuteImage(commuteItem)
            .subscribe(commuteImage => {
            this.commuteImage = commuteImage;
            this.generateImageUrl(this.commuteImage);
        });
    }
    generateImageUrl(imageBlob) {
        var reader = new FileReader();
        var base64data;
        reader.readAsDataURL(imageBlob);
        reader.onloadend = () => {
            base64data = reader.result;
            this.setAndSanitizeImageUrl(base64data);
        };
    }
    setAndSanitizeImageUrl(base64data) {
        this.commuteImagePath = base64data;
        this.sanitizer.bypassSecurityTrustUrl(this.commuteImagePath);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], CommuteComponent.prototype, "commuteItemId", void 0);
CommuteComponent = tslib_1.__decorate([
    Component({
        selector: 'app-commute',
        templateUrl: './commute.component.html',
        styleUrls: ['./commute.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [CommuteService, DomSanitizer])
], CommuteComponent);
export { CommuteComponent };
//# sourceMappingURL=commute.component.js.map