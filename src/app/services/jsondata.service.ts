import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable, BehaviorSubject } from "rxjs";
import 'rxjs/Rx';

@Injectable()
export class JsondataService {
    private url: string;

    // private dataset = new BehaviorSubject<string>("prophecy_of_the_six_kings"); //CREATE INTERFACE
    //  	currentDataset = this.dataset.asObservable();

    private dataSet: string;

    private rawDataSource = new BehaviorSubject<any>([]); //CREATE INTERFACE
    currentRawData = this.rawDataSource.asObservable();

    private timelinesYaxisSource = new BehaviorSubject<string>('language'); //CREATE INTERFACE
    currentTimelinesYaxis = this.timelinesYaxisSource.asObservable();
    //private dataset: Observable<string>;

    constructor(public http: Http) {
        this.url = window.location.protocol + '//' + window.location.host + window.location.pathname + 'data/';
    }

    getData(): Observable<any[]> {
        var fullUrl = this.url + this.dataSet + '.json';
        return this.http.get(fullUrl)
            .map((res: Response) => {
                return res.json().texts;
            })
            .catch(this.handleError);
    }

    getRawData(): any {
        return this.rawDataSource.getValue();
    }

    setDataset(dataset: string) {
        this.dataSet = dataset;

        this.getData().subscribe(
            resultArray => {
                this.rawDataSource.next(resultArray);
            },
            error => console.log('Error :: ' + error)
        )
    }

    getTimelinesYaxi(): string {
        return this.timelinesYaxisSource.getValue();
    }

    setTimelinesYaxis(yAxis: string) {
        this.timelinesYaxisSource.next(yAxis);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}

