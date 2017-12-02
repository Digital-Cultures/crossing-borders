import { Component, OnInit } from '@angular/core';
import { UidataService } from '../services/uidata.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-playhead',
  templateUrl: './playhead.component.html',
  styleUrls: ['./playhead.component.scss']
})
export class PlayheadComponent implements OnInit {
  date:number;
  playing:boolean = true;

  constructor(
    private uidataService: UidataService
    ) {
    this.uidataService.currentDate.subscribe(date => {
      this.date = date;
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

  clickPlay(event){
    this.playing = true;
    this.asyncObservable()
      .takeWhile(() => this.playing)
      .subscribe(data=>{
      if(this.date >= parseInt(this.uidataService.getEnding()) || this.date == -1){
        this.uidataService.changeDate(parseInt(this.uidataService.getBegining()));
      }else{
        var nextDate = this.date+1
        this.uidataService.changeDate(nextDate);
      }
    });
  }

  clickStop(event){
    this.playing = false;
  }
}
