import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

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
    }
]
  constructor() { }

  ngOnInit() {
  }

}
