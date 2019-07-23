import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from "rxjs"
import 'rxjs/Rx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AgmCoreModule } from '@agm/core';

import { JsondataService } from '../services/jsondata.service';
import { ColorsService } from '../services/colors.service';
import { UidataService } from '../services/uidata.service';
import { TextModalComponent } from '../text-modal/text-modal.component';
import { Http } from '@angular/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  mapData = [];
  public markers$: Observable<any>;
  public json$: Observable<any>;

  private countryGeoJson:  { [country: string]: any; } = { };;   

  titleMap: string = 'Google Maps Addeed Successfully';
  lat: number = 53;
  lng: number = -2;
  zoom: number = 4;

  geoJsonObject: any = {};
  countriesLoaded = [];

  clicked(clickEvent) {
      console.log(clickEvent);
    }
  
  styleFunc(feature) {
    //console.log(feature.getProperty('color'));
    return ({
      clickable: true,
      fillOpacity: feature.getProperty('opacity'),
      fillColor: feature.getProperty('color'),
      strokeColor: '#444444',//feature.getProperty('color'),
      strokeOpacity: 1,
      strokeWeight: 10
    });
  }
  
  styles = [
    {
      "featureType": "all",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#222222"
        },
        {
          "lightness": 0
        }
      ]
    }];


  constructor(
    private jsondataService: JsondataService,
    private colorsService: ColorsService,
    private uidataService: UidataService,
    private modalService: NgbModal,
    private http: Http
  ) {
    this.uidataService.currentMapMarkers.subscribe(markers => {
      this.markers$ = markers;
    });

    this.uidataService.currentMapCountries.subscribe(countries => {
      this.json$ = countries;
      //clear data
      this.geoJsonObject = {};
      this.countriesLoaded = [];

      this.json$.forEach( (element) => {
          this.addCountry(element);
      });

    });

    //this.getJSON("scotland").subscribe(data => this.addGeoJson(data), error => console.log(error));
  }

  private addCountry(element){
    if (this.countryGeoJson[element.country] != undefined){
      if (this.countriesLoaded.indexOf(element.country) < 0){
        let temp = this.countriesLoaded.indexOf(element.country);
        this.addGeoJson(this.countryGeoJson[element.country],element);
        this.countriesLoaded.push(element.country)
      } else {
        //increase the colour of the polygon
        for (let key in this.geoJsonObject.features) {
          if (this.geoJsonObject.features[key].properties.nameCB==element.country){
            this.geoJsonObject.features[key].properties.opacity += 0.1;
            if (this.geoJsonObject.features[key].properties.opacity>1){
              this.geoJsonObject.features[key].properties.opacity = 1;
            }
          }
        }

      }
    }else{
      this.getGeoJSON(element.country).subscribe(data => this.storeGeoJson(data, element), error => console.log(error));
    }
  }
  
  private addGeoJson(data, element){
    for (let key in data.features) {
      // make opaque 
      data.features[key].properties.color = element.color.replace(/[^,]+(?=\))/, '1');
      data.features[key].properties.opacity = 0.1;
      data.features[key].properties.nameCB = element.country;
    }
    if (this.geoJsonObject.hasOwnProperty('features')){
        this.geoJsonObject = { 
          "type" : "FeatureCollection",
          "features": this.geoJsonObject.features.concat(data.features)
      }
    //  console.log(this.geoJsonObject);
    }else{
      //its the first json to be added
      this.geoJsonObject = data;
    }  
  }

  private storeGeoJson(data, element){
    this.countryGeoJson[element.country]=data;
    this.addGeoJson(data, element);
  }
  
  public getGeoJSON(contry: string): Observable<any> {
    return this.http.get("./assets/geoJson/"+contry+".json").map((res:any) => res.json());
}

  ngOnInit() {
    this.jsondataService.currentRawData.subscribe((data) => {
      this.uidataService.setMapData(data, this.jsondataService.getTimelinesYaxi());
      this.uidataService.changeDate(-1);
    });

    this.jsondataService.currentTimelinesYaxis.subscribe((yAxis: string) => {
      this.uidataService.setMapData(this.jsondataService.getRawData(), yAxis);
      this.uidataService.changeDate(-1);
    })
  }

  clickedMarker(data: any, i: number) {
    this.open(data);
  }

  overMarker(id: string, i: number) {
    console.log(id);
    this.uidataService.setSelectedTextID(parseInt(id));
  }

  outMarker(label: string, i: number) {
    console.log(label);
    this.uidataService.setSelectedTextID(-1);
  }

  clickedCountry(clickEvent) {
    console.log(clickEvent.feature.getProperty('nameCB'));
    var stack = this.uidataService.getDataByCountryAndDate(clickEvent.feature.getProperty('nameCB'))
    this.open(stack);
  }

  open(data: any) {
    console.log(data);
    const modalRef = this.modalService.open(TextModalComponent);
    modalRef.componentInstance.data = data;
  }

}
