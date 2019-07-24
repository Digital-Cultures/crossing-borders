import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visulisation',
  templateUrl: './visulisation.component.html',
  styleUrls: ['./visulisation.component.scss']
})
export class VisulisationComponent implements OnInit {

  constructor() {
    document.getElementsByClassName("menuSelect")[0]['style'].display = "block";
    document.getElementsByClassName("menuTitle")[0]['style'].display = "block";
   }

  ngOnInit() {
  }

}
