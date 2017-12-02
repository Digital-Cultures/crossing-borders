import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { JsondataService } from '../services/jsondata.service';
import { ColorsService } from '../services/colors.service';

@Injectable()
export class UidataService {
private timelineData = [];  //CREATE INTERFACE

private mapMarkers:any = [];
private mapMarkersSource = new BehaviorSubject<any>([]); //CREATE INTERFACE
currentMapMarkers = this.mapMarkersSource.asObservable();

private selectedDate:number;

private dateSource = new BehaviorSubject<number>(1300);
currentDate = this.dateSource.asObservable();

private _beginning: string = "1250"; // CALL FROM UI SERVICE
private _ending: string = "1600"; // CALL FROM UI SERVICE

  constructor(
     private colorsService: ColorsService,
     private jsondataService: JsondataService
     ) { }

  selectItem(id:string){
    var idCode = id.split("_");
    console.log(this.timelineData[parseInt(idCode[1])].label);
    console.log(this.timelineData[parseInt(idCode[1])].ids[parseInt(idCode[2])]);
  }

  setGraphData(data:any[]) :any[]{
    
      for(var i = 0; i < data.length-1; i++) {
          
          var exists = false;
          var start:Date = new Date(data[i].start);
          var end:Date = new Date(data[i].end);

          for(var k = 0; k < this.timelineData.length; k++) {
            if (this.timelineData[k].label === data[i].name) {
                this.timelineData[k].times.push({"color":this.colorsService.getColorByLabel(data[i].name),  "starting_time": start, "ending_time": end})
                this.timelineData[k].ids.push(data[i].id);
                exists = true; // stop searching
            } 
          };

          //add new series
          if (!exists){
            this.timelineData.push({label: data[i].name, ids: [data[i].id], times: [{"color":this.colorsService.getColorByLabel(data[i].name),  "starting_time": start, "ending_time": end}]})
          }
      }
      return this.timelineData;
   }

   setMapData(data): Observable<any> {

      for(var i = 0; i < data.length-1; i++) {

        if('geometry' in data[i]){
          var lat = data[i].geometry.coordinates[0];
          var lng = data[i].geometry.coordinates[1];
          this.mapMarkers.push({
            lat: lat,
            lng: lng,
            label: data[i].name,
            draggable: true,
            data: data[i],
            icon: window.location.protocol + '//' + window.location.host + window.location.pathname + this.colorsService.getMarkerByLabel(data[i].name)
      });
        }
      }
      return this.mapMarkers;
  }

  changeDate(date: number) {
    this.dateSource.next(date)
    this.mapMarkersSource.next(this.mapMarkers.filter(
          mapMarker => parseInt(mapMarker.data.start) <= date  && parseInt(mapMarker.data.end) >= date));
    console.log(this.mapMarkersSource);
  }

  getBegining() : string {
    return this._beginning;
  }

  getEnding() : string {
    return this._ending;
  }

  playPlayhead() {
          
  }

  stopPlayhead() {
    
  }
}
