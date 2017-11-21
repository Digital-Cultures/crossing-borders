import { Injectable } from '@angular/core';

@Injectable()
export class ColorsService {
  private color: string[] = ["rgba(47,89,97,0.2)","rgba(47,64,89,0.2)","rgba(89,58,47,0.2)","rgba(47,89,97,0.2)","rgba(47,64,89,0.2)","rgba(89,58,47,0.2)"];
  private mapMarker: string[] = ["assets/greenMapIcon.png","assets/blueMapIcon.png","assets/redMapIcon.png","assets/greenMapIcon.png","assets/blueMapIcon.png","assets/redMapIcon.png"];
  private label: string[] = [];

  constructor() { }

  getColorsArray() {
    return this.color;
  }

  getColorByID(id:number) {
    return this.color[id];
  }

  getColorByLabel(name:string){
  	var exists = false;


    for(var k = 0; k < this.label.length; k++) {

        if (this.label[k] === name) {
            return this.color[k];
        } 
    };

	//add new series
	if (!exists){
		this.label.push(name);
		return this.color[this.label.length-1];
	}
  }

  getMapMarkerByID(id:number) {
  	return this.mapMarker[id];
  }

  getMarkerByLabel(name:string){
  	var exists = false;


    for(var k = 0; k < this.label.length; k++) {

        if (this.label[k] === name) {
            return this.mapMarker[k];
        } 
    };

	//add new series
	if (!exists){
		this.label.push(name);
		return this.mapMarker[this.label.length-1];
	}
  }

}
