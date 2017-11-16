import { Injectable } from '@angular/core';

@Injectable()
export class ColorsService {
  private color: string[] = ["rgba(47,89,97,0.2)","rgba(47,64,89,0.2)","rgba(89,58,47,0.2)","rgba(47,89,97,0.2)","rgba(47,64,89,0.2)","rgba(89,58,47,0.2)"];
  private mapMarker: string[] = ["../../assets/greenMapIcon.png","../../assets/blueMapIcon.png","../../assets/redMapIcon.png","../../assets/greenMapIcon.png","../../assets/blueMapIcon.png","../../assets/redMapIcon.png"];
  private label: string[];

  constructor() { }

  getColorsArray() {
    return this.color;
  }

  getColor(number) {
  	console.log(number);
    return this.color[number];
  }

  getMapMarker(number) {
  	return this.mapMarker[number];
  }

}
