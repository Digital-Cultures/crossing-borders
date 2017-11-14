import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class JsondataService {

  constructor(public http:Http) { }

  getData() {
  	console.log('load data');

    return this.http.get("../data/example.json")
        .map((res:Response) => res.json().texts);
  }
}
