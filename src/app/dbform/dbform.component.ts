import { Component } from '@angular/core';
import { DataSourceRequest, DataSourceResultOfUser, User } from "../../../api/api.module";
import { Observable } from 'rxjs/Observable';

import { JsondataService } from '../services/jsondata.service';

@Component({
  selector: 'app-dbform',
  templateUrl: './dbform.component.html',
  styleUrls: ['./dbform.component.css']
})
export class DbformComponent {
    constructor(private jsondataService: JsondataService) { }

  public options:any = {
      orderMulti: false,
      className: ['table-striped'],
      language: "en"
  };

  public datasource: any = (request: DataSourceRequest): Observable<DataSourceResultOfUser> => {
    // if(environment.apiBaseUrl){
    //     return this.client.get(DataSourceRequest.fromJS(request));
    // }
      return this.jsondataService.getData(request);
  }

  public paging: any = {
      itemsPerPage: 10,
      itemsPerPageOptions: [5, 10, 25, 50, 100],
      maxSize: 5
  }

  public columns:Array<any> = [
    { 
        title: 'Name', 
        name: 'name', 
        sort: true, 
        defaultSortOrder: 'asc',  
        filter: {
            type: 'default', 
            controlType: 'default',
            config: {
                placeholder: 'Filter by name'
            }
        } 
    },
    { 
        title: 'Language', 
        name: 'language', 
        sort: true, 
        filter: {
            type: 'default', 
            controlType: 'default',
            config: {
                placeholder: 'Filter by language'
            }
        } 
    },
    { 
        title: 'Date of Compilation (Start)', 
        name: 'compilationDate', 
        sort: false, 
        filter: {
            type: 'default', 
            controlType: 'default',
            config: {
                placeholder: 'Filter by date'
            }
        } 
    }//,
    // { 
    //     title: 'Date of Compilation (Start)', 
    //     name: 'start', 
    //     sort: true, 
    //     filter: {
    //         type: 'default', 
    //         controlType: 'default',
    //         config: {
    //             placeholder: 'Filter by date'
    //         }
    //     } 
    // },
    // { 
    //     title: 'Date of Compilation (End)', 
    //     name: 'end', 
    //     sort: true, 
    //     filter: {
    //         type: 'default', 
    //         controlType: 'default',
    //         config: {
    //             placeholder: 'Filter by date'
    //         }
    //     } 
    // },
    // { 
    //     sort: false, 
    //     title: '', 
    //     name: 'btnEdit',
    //     render: (data: any, row: User): string => {
    //         return "<div class='text-center'>" +
    //             "<button type='button' class='btn btn-sm btn-primary'><span class='glyphicon glyphicon-pencil'></span></button> " +
    //             "</div>";
    //     },
    //     action: (data: any, row: User): any => {
    //       alert("Id: " + row.id);
    //     },
    //     width: "10px"
    // },
    // { 
    //     sort: false, 
    //     title: '', 
    //     name: 'geometry',
    //     render: (data: any): string => {
    //         return "<div class='text-center'>" +
    //             "<button type='button' class='btn btn-sm btn-primary'><span class='fa fa-info-circle'></span></button> " +
    //             "</div>";
    //     },
    //     action: (data: any): any => {
    //     	var temp = data;
    //       alert("Modal popup with more info"+data);
    //     },
    //     width: "10px"
    // }
  ];
}