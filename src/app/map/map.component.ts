import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { JsondataService } from '../services/jsondata.service';
import { ColorsService } from '../services/colors.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
	private mapData = [];

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
	        	"color": "#b9d3c2"
            },
            {
                "lightness": 0
            }
        ]
    }];

    markers = [];

  constructor(private jsondataService: JsondataService,  private colorsService: ColorsService) { }

  ngOnInit() {
   	this.jsondataService.getData().subscribe((data) => {       
	    this.prepareData(data);
	  });

  }

  private prepareData(data){

      for(var i = 0; i < data.length-1; i++) {
          
          // var exists = false;
          // var start:Date = new Date(data[i].start);
          // var end:Date = new Date(data[i].end);


      	if('geometry' in data[i]){
      		var lat = data[i].geometry.coordinates[0];
      		var lng = data[i].geometry.coordinates[1];
      		this.markers.push({
      			lat: lat,
				    lng: lng,
				    label: data[i].name,
				    draggable: true,
            data: data[i],
            icon: this.colorsService.getMarkerByLabel(data[i].name)
			});
      	}
      }
  }

  clickedMarker (label:string, i:number){
    console.log(label);
  }
}
