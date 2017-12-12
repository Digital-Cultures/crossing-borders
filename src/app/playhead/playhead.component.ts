import { Component, OnInit } from '@angular/core';
import { UidataService } from '../services/uidata.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-playhead',
  templateUrl: './playhead.component.html',
  styleUrls: ['./playhead.component.scss']
})
export class PlayheadComponent implements OnInit {
  date: number;
  startDate: number;
  endDate: number;
  playing: boolean = true;

  constructor(
    private uidataService: UidataService
  ) {
    this.uidataService.currentDate.subscribe(date => {
      this.date = date;
    })

    this.uidataService.currentStartDate.subscribe(startDate => {
      this.startDate = startDate;
    })

    this.uidataService.currentEndDate.subscribe(endDate => {
      this.endDate = endDate;
    })
  }

  ngOnInit() {
  }

  asyncObservable() {
    return new Observable(observer => {
      setInterval(() => {
        observer.next("Hi");
      }, 100)
    })
  }

  clickPlay(event) {
    this.playing = true;
    this.asyncObservable()
      .takeWhile(() => this.playing)
      .subscribe(data => {
        if (this.endDate >= parseInt(this.uidataService.getEnding())) {
          var ending = this.endDate - this.startDate;
          this.uidataService.changeDate(parseInt(this.uidataService.getBegining()),"start");
          this.uidataService.changeDate(parseInt(this.uidataService.getBegining()) + ending, "end");
        } else {
          this.uidataService.changeDate(this.startDate+1, "start");
          this.uidataService.changeDate(this.endDate+1, "end");
        }
      });
  }

  clickStop(event) {
    this.playing = false;
  }
}
