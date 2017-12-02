import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Observable} from "rxjs"
import 'rxjs/Rx';

import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { JsondataService } from '../services/jsondata.service';
import { ColorsService } from '../services/colors.service';
import { UidataService } from '../services/uidata.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
	mapData = [];
  public markers$ : Observable<any>;

  titleMap: string = 'Google Maps Addeed Successfully';
  lat: number = 51.5074;
  lng: number = 0.1278;
  zoom: number = 4;
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
	        	"color": "#7e99ab"
            },
            {
                "lightness": 0
            }
        ]
    }];

    

  constructor(
    private jsondataService: JsondataService,  
    private colorsService: ColorsService,
    private uidataService: UidataService
    ) { 
      this.uidataService.currentMapMarkers.subscribe(markers => {
        this.markers$ = markers;
      })
    }

  ngOnInit() {
   	this.jsondataService.getData().subscribe((data) => {       
	    this.uidataService.setMapData(data);
	  });

  }

  clickedMarker (label:string, i:number){
    console.log(label);
  }
}
