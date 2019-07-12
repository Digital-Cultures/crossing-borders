import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { JsondataService } from '../services/jsondata.service';
import { ColorsService } from '../services/colors.service';

@Injectable()
export class UidataService {

  private rawData = [];
  public timelineData = [];  //CREATE INTERFACE

  private mapMarkers: any = [];
  private mapMarkersSource = new BehaviorSubject<any>([]); //CREATE INTERFACE
  currentMapMarkers = this.mapMarkersSource.asObservable();

  private mapCountries: any = [];
  private mapCountriesSource = new BehaviorSubject<any>([]); //CREATE INTERFACE
  currentMapCountries = this.mapCountriesSource.asObservable();

  private selectedCountries: any = [];
  

  // private dateSource = new BehaviorSubject<number>(1300);
  // currentDate = this.dateSource.asObservable();

  private selectedStartDateSource = new BehaviorSubject<number>(1300);
  currentStartDate = this.selectedStartDateSource.asObservable();

  private selectedEndDateSource = new BehaviorSubject<number>(1500);
  currentEndDate = this.selectedEndDateSource.asObservable();

  private _beginning: string = "1500"; // CALL FROM UI SERVICE
  private _ending: string = "1500"; // CALL FROM UI SERVICE

  private selectedTextID = new BehaviorSubject<number>(-1);
  currentTextID = this.selectedTextID.asObservable();

  constructor(
    private colorsService: ColorsService,
    private jsondataService: JsondataService
  ) { 

    this.currentMapCountries.subscribe(countries => {
      this.selectedCountries = [];
      countries.forEach( (element) => {
          this.selectedCountries.push(element);
      });
    });
  }

  getItemFromChart(elementId: string): any {
    var idCode = elementId.split("_");
    console.log(this.timelineData[parseInt(idCode[1])].label);
    console.log(this.timelineData[parseInt(idCode[1])].ids[parseInt(idCode[2])]);

    var id = this.timelineData[parseInt(idCode[1])].ids[parseInt(idCode[2])];

    for (var i = 0; i < this.rawData.length ; i++) {
      if (this.rawData[i].id == id) {
        return this.rawData[i];
      }
    }
    return false;
  }

  setGraphData(data: any[], yAxis: string): any[] {
    this.rawData = data;
    this.timelineData = [];
    for (var i = 0; i <= data.length - 1; i++) {


      var exists = false;
      var start: Date = new Date(data[i].start);
      var end: Date = new Date(data[i].end);

      for (var k = 0; k < this.timelineData.length; k++) {
        if (this.timelineData[k].label === data[i][yAxis]) {
          this.timelineData[k].times.push({ "color": this.colorsService.getColorByLabel(data[i][yAxis]), "starting_time": start, "ending_time": end })
          this.timelineData[k].ids.push(data[i].id);
          exists = true; // stop searching
        }
      };

      if (new Date(start) < new Date(this._beginning)) {
        this._beginning = data[i].start;
      }

      if (new Date(end) > new Date(this._ending)) {
           this._ending = data[i].end;
      }

      //add new series
      if (!exists) {
        this.timelineData.push({ label: data[i][yAxis], ids: [data[i].id], times: [{ "color": this.colorsService.getColorByLabel(data[i][yAxis]), "starting_time": start, "ending_time": end }] })
      }
    }
    return this.timelineData;
  }

  setMapData(data: any[], yAxis: string): Observable<any> {

    this.mapMarkers = [];
    this.mapCountries = [];
    var countries = ["england", "scotland", "france","wales","denmark","germany","greenland","iceland","ireland","italy","luxembourg","netherlands","norway","portugal","spain","sweden","switzerland"];

    for (var i = 0; i < data.length; i++) {

      if ('geometry' in data[i]) {
        var lat = data[i].geometry.coordinates[0];
        var lng = data[i].geometry.coordinates[1];
        this.mapMarkers.push({
          lat: lat,
          lng: lng,
          label: data[i].name,
          draggable: true,
          data: data[i],
          id: data[i].id,
          icon: window.location.protocol + '//' + window.location.host + window.location.pathname + this.colorsService.getMarkerByLabel(data[i][yAxis])
        });
      } else if ('compilationPlace' in data[i]){
        console.log('compilationPlace: ' + data[i].compilationPlace)
        for (var j = 0; j < countries.length; j++){
          if (data[i].compilationPlace.toLowerCase().indexOf(countries[j]) > -1) {
            
            this.mapCountries.push({
              label: data[i].name,
              data: data[i],
              id: data[i].id,
              country: countries[j],
              color: this.colorsService.getColorByLabel(data[i][yAxis])
              //place: window.location.protocol + '//' + window.location.host + window.location.pathname + this.colorsService.getMarkerByLabel(data[i][yAxis])
            })
            break;
          }
        }
      }
    }
    return this.mapMarkers;
  }

  changeDate(date: number, position?: string) {
    switch (position) { 
      case "start": { 
        if (date < parseInt(this._beginning)){
          date = parseInt(this._beginning);
        }

        if (date > this.selectedEndDateSource.getValue()) {
          date = this.selectedEndDateSource.getValue();
        }

        this.selectedStartDateSource.next(date)
 
        this.mapMarkersSource.next(this.mapMarkers.filter(
          mapMarker => (
              parseInt(mapMarker.data.start) <= this.selectedEndDateSource.getValue() && 
              parseInt(mapMarker.data.end) >= this.selectedStartDateSource.getValue()) 
          ));

        this.mapCountriesSource.next(this.mapCountries.filter(
          mapCountry => (
            parseInt(mapCountry.data.start) <= this.selectedEndDateSource.getValue() && 
            parseInt(mapCountry.data.end) >= this.selectedStartDateSource.getValue()) 
        ));
          
        break;
      }
      case "end": {
        if (date > parseInt(this._ending)) {
          date = parseInt(this._ending);
        }

        if (date < this.selectedStartDateSource.getValue()) {
          date = this.selectedStartDateSource.getValue();
        }


        this.selectedEndDateSource.next(date)
        this.mapMarkersSource.next(this.mapMarkers.filter(
          mapMarker => (
            parseInt(mapMarker.data.start) <= this.selectedEndDateSource.getValue() &&
            parseInt(mapMarker.data.end) >= this.selectedStartDateSource.getValue()) 
          ));

        this.mapCountriesSource.next(this.mapCountries.filter(
            mapCountry => (
              parseInt(mapCountry.data.start) <= this.selectedEndDateSource.getValue() && 
              parseInt(mapCountry.data.end) >= this.selectedStartDateSource.getValue()) 
          ));

        break;
      }
      default: {
        //this.dateSource.next(date)
        this.mapMarkersSource.next(this.mapMarkers.filter(
          mapMarker => (parseInt(mapMarker.data.start) <= date && parseInt(mapMarker.data.end) >= date) || 
          (-1 == date &&
              parseInt(mapMarker.data.start) <= this.selectedEndDateSource.getValue() &&
              parseInt(mapMarker.data.end) >= this.selectedStartDateSource.getValue())
          ));

          this.mapCountriesSource.next(this.mapCountries.filter(
            mapCountry => (parseInt(mapCountry.data.start) <= date && parseInt(mapCountry.data.end) >= date) || 
            (-1 == date &&
                parseInt(mapCountry.data.start) <= this.selectedEndDateSource.getValue() &&
                parseInt(mapCountry.data.end) >= this.selectedStartDateSource.getValue())
            ));
        break;
      } 
    }    
  }

  setSelectedTextID(id: number) {
    this.selectedTextID.next(id);
  }

  getBegining(): string {
    return this._beginning;
  }

  getEnding(): string {
    return this._ending;
  }

  public getDataByCountryAndDate(country: string){
    var data = [];
    for (var i = 0; i < this.selectedCountries.length ; i++) {
      if (this.selectedCountries[i].country == country) {
        data.push(this.selectedCountries[i].data);
      }
    }
    return data;
  }

  public setCommentMarker(data: any){
    for (var k = 0; k < this.timelineData.length; k++) {
      // add to right y-axis
      if (this.timelineData[k].label === data[this.jsondataService.getTimelinesYaxi()]) {
        this.timelineData[k].times.push({ "color": "rgba(255,100,100,1)", "starting_time": new Date((new Date(data.start).getTime() + new Date(data.end).getTime()) / 2), "display": "circle" });
        //hacky way to make the graph reload (should really have it's own observable)
        this.selectedTextID.next(-1);
        break;
      }
    }
  }

}
