import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class JsondataService {

  constructor(public http:Http) { }

  getData() {
  	console.log('load data');

    return this.http.get(window.location.protocol + '//' + window.location.host + window.location.pathname + "data/example.json")
        .map((res:Response) => res.json().texts);
  }
}
