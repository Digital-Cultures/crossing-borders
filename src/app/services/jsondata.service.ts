import { Injectable } from '@angular/core';
import { Headers, Http, Response, Jsonp } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import 'rxjs/Rx';

@Injectable()
export class JsondataService {
    private url: string;

    //Data to plot
    private dataSet: string;
    private rawDataSource = new BehaviorSubject<any>([]); //CREATE INTERFACE
    currentRawData = this.rawDataSource.asObservable();

    //comment marker data
    private rawMarkerDataSource = new BehaviorSubject<any>([]); //CREATE INTERFACE
    currentMarkerRawData = this.rawMarkerDataSource.asObservable();

    private timelinesYaxisSource = new BehaviorSubject<string>('language'); //CREATE INTERFACE
    currentTimelinesYaxis = this.timelinesYaxisSource.asObservable();
    //private dataset: Observable<string>;

    constructor(
        public http: Http,
        private jsonp: HttpClient
        ) 
    {
        this.url = window.location.protocol + '//' + window.location.host + window.location.pathname + 'data/';
    }

    getRawData(): any {
        return this.rawDataSource.getValue();
    }
    setDataset(dataset: string) {
        this.dataSet = dataset;

        this.getData().subscribe(
            resultArray => {
                this.rawDataSource.next(resultArray);
                this.setMarkerDataset();
            },
            error => console.log('Error :: ' + error)
        )
    }
    getDataset():string{
        return this.dataSet;
    }

    //COMMENT 
    getRawMarkerData(): any {
        return this.rawMarkerDataSource.getValue();
    }
    setMarkerDataset() {
        //this.markerDataSet = markerDataSet;

        this.getMarkerData().subscribe(
            resultArray => {
                this.rawMarkerDataSource.next(resultArray);
            },
            error => console.log('Error :: ' + error)
        )
    }

    getTimelinesYaxi(): string {
        return this.timelinesYaxisSource.getValue();
    }

    setTimelinesYaxis(yAxis: string) {
        this.timelinesYaxisSource.next(yAxis);
        this.setMarkerDataset();
    }


    getData(request?: any ): Observable<any> {
        var fullUrl: string;

        if (window.location.href.slice(-2) == "db") {

            fullUrl = window.location.href.slice(0, -4) + 'data/' + this.dataSet + '.json?';
            
            
            return this.http.get(fullUrl).map(res => {
                let sourceData: any[] = res.json().texts;
                let data: any[] = sourceData;

                data.sort(function(a, b) {
                    //just order by one value at the moment
                    if (request.orders.length > 0) {
                        if (request.orders[0].dir === "asc") {
                            return (a[request.orders[0].name] < b[request.orders[0].name]) ? -1 : (a[request.orders[0].name] > b[request.orders[0].name]) ? 1 : 0;
                        } else {
                            return (a[request.orders[0].name] > b[request.orders[0].name]) ? -1 : (a[request.orders[0].name] < b[request.orders[0].name]) ? 1 : 0;
                        }
                    }
                });

                request.filters.forEach((filter) => {
                    if (filter.value) {
                        data = data.filter(function(i) {
                            return typeof i[filter.name] == 'string' && i[filter.name].toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
                        });
                    }
                });


                data = data.slice(request.start, parseInt(request.length) + request.start);
                let count = res.headers.get('x-total-count');
                return {
                    recordsTotal: sourceData.length,
                    recordsFiltered: sourceData.length,
                    data: data
                };
            });
        } else {
            fullUrl = this.url + this.dataSet + '.json';
            return this.http.get(fullUrl)
                .map((res: Response) => {
                    return res.json().texts;
                })
                .catch(this.handleError);
        }
    }

    getMarkerData(request?: any ): Observable<any> {
        var fullUrl: string;

        if (window.location.href.slice(-2) == "db") {

        } else {
            return this.http.get('php/commentMarks.php')
                .map((res: Response) => {
                    return res.json();
                })
                .catch(this.handleError);
        }
    }

    // public getCommentCount(identifier:string) {
    //     this.jsonp.get('php/commentMarks.php').subscribe(data => {
    //           console.log(data);
    //         });
    // }

    setComentCount():string{
        return "here"
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}

