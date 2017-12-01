import { Component, OnInit } from '@angular/core';
import { UidataService } from '../services/uidata.service';

@Component({
  selector: 'app-playhead',
  templateUrl: './playhead.component.html',
  styleUrls: ['./playhead.component.scss']
})
export class PlayheadComponent implements OnInit {

  constructor(
    private uidataService: UidataService
    ) { }

  ngOnInit() {
  }

  clickPlay(event){
    this.uidataService.playPlayhead();
  }

  clickStop(event){
    this.uidataService.stopPlayhead();
  }
}
