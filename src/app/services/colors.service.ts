import { Injectable } from '@angular/core';

@Injectable()
export class ColorsService {
  private color: string[] = ["rgba(27,158,119,0.2)", "rgba(217,95,2,0.2)", "rgba(117,112,179,0.2)", "rgba(231,41,138,0.2)", "rgba(102,166,30,0.2)", "rgba(230,171,2,0.2)", "rgba(166,118,29,0.2)", "rgba(102,102,102,0.2)"];
  private mapMarker: string[] = ["assets/green.png", "assets/orange.png", "assets/purple.png", "assets/pink.png", "assets/lime.png", "assets/yellow.png", "assets/brown.png", "assets/grey.png"];
  private label: string[] = [];
  private labelColor: string[] = [];
  private labelMapMarker: string[] = [];

  constructor() { }

  getColorsArray() {
    return this.color;
  }

  getColorByID(id: number) {
    return this.color[id];
  }

  getColorByLabel(name: string) {
    var exists = false;
    var col;

    for (var k = 0; k < this.label.length; k++) {

      if (this.label[k] === name) {
        col = this.labelColor[k];
        return col;
      }
    };

    //add new series
    if (!exists) {
      this.label.push(name);

      var i = this.label.length - 1;
      var j = Math.floor(this.label.length / this.color.length)
      var k = i - (j * (this.color.length - 1));
      col = this.color[k];
      this.labelColor.push(col);
      return this.labelColor[this.label.length - 1];
    }
  }

  getMapMarkerByID(id: number) {
    return this.mapMarker[id];
  }

  getMarkerByLabel(name: string) {
    var exists = false;


    for (var k = 0; k < this.label.length; k++) {

      if (this.label[k] === name) {
        return this.mapMarker[k];
      }
    };

    //add new series
    if (!exists) {
      this.label.push(name);
      var i = Math.floor(this.label.length - 1 / this.color.length - 1);
      return this.mapMarker[this.label.length - 1];
    }
  }

}
