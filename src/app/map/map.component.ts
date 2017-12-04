import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Observable} from "rxjs"
import 'rxjs/Rx';

import { AgmCoreModule } from '@agm/core';
//import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { JsondataService } from '../services/jsondata.service';
import { ColorsService } from '../services/colors.service';
import { UidataService } from '../services/uidata.service';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}


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
  closeResult: string;

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

  clickedMarker (id:string, i:number){
    this.open(this.uidataService.getInfoFromID(parseInt(id)));
  }

  overMarker(id:string, i:number){
    this.uidataService.setSelectedTextID(parseInt(id));
    console.log(id);
  }

  outMarker(label:string, i:number){
    this.uidataService.setSelectedTextID(-1);
    console.log(label);
  }

  open(content) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';

    // this.modalService.open(content).result.then((result) => {
    //   console.log("here");
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   console.log("here2");
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    

    // });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
