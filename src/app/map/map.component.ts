import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Observable} from "rxjs"
import 'rxjs/Rx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AgmCoreModule } from '@agm/core';

import { JsondataService } from '../services/jsondata.service';
import { ColorsService } from '../services/colors.service';
import { UidataService } from '../services/uidata.service';
import { TextModalComponent } from '../text-modal/text-modal.component';


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
  zoom: number = 6;

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
    private uidataService: UidataService,
    private modalService: NgbModal
    ) { 
      this.uidataService.currentMapMarkers.subscribe(markers => {
        this.markers$ = markers;
      })
    }

  ngOnInit() {
   	this.jsondataService.getData().subscribe((data) => {       
	    this.uidataService.setMapData(data);
      this.uidataService.changeDate(-1);
	  });

  }

  clickedMarker (data:any, i:number){
    this.open(data);
  }

  overMarker(id:string, i:number){
    this.uidataService.setSelectedTextID(parseInt(id));
    console.log(id);
  }

  outMarker(label:string, i:number){
    this.uidataService.setSelectedTextID(-1);
    console.log(label);
  }

  open(data:any) {
    const modalRef = this.modalService.open(TextModalComponent);
    modalRef.componentInstance.data = [data];
  }

}
