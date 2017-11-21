import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataSourceService {

  constructor(private http: Http) { }

  getUsersDataSource(request:any): Observable<any> {
    let url = window.location.protocol + '//' + window.location.host + window.location.pathname.slice(0, -2) + 'data/example.json?';
    return this.getDataSource(url, request);
  }
  
  private getDataSource(url:string, request:any): Observable<any> {
    let page = request.start > 0 ? (request.start / request.length) + 1 : request.start + 1;
    url += `_page=${page}&_limit=${request.length}&`;


    request.orders.forEach((order) => {
      url += `_sort=${order.name}&_order=${order.dir.toUpperCase()}&`;
    });

    request.filters.forEach((filter) => {
      if (filter.value) {
        url += `${filter.name}_like=${filter.value}&`;
      }
    });

    if(request.fullTextFilter){
      url += `q=${request.fullTextFilter}&`;
    }

    return this.http.get(url).map(res => {
      let sourceData:any[] = res.json().texts;
      let data:any[] = sourceData;

      data.sort(function(a, b){
        //just order by one value at the moment
        if (request.orders.length>0){
          if (request.orders[0].dir==="asc"){
            return (a[request.orders[0].name] < b[request.orders[0].name]) ? -1 : (a[request.orders[0].name] > b[request.orders[0].name]) ? 1 : 0;
          }else{
            return (a[request.orders[0].name] > b[request.orders[0].name]) ? -1 : (a[request.orders[0].name] < b[request.orders[0].name]) ? 1 : 0;
          }
        }
      });

      request.filters.forEach((filter) => {
        if (filter.value) {
          data = data.filter(function(i) {
            return typeof i[filter.name] == 'string' && i[filter.name].indexOf(filter.value) > -1;  
          });
        }
      });
      

      data = data.slice(request.start, parseInt(request.length)+request.start);
      let count = res.headers.get('x-total-count');
      return {
        recordsTotal: sourceData.length,
        recordsFiltered: sourceData.length,
        data: data
      };
    });
  }
}