import { Component } from '@angular/core';
import { DataSourceRequest, DataSourceResultOfUser, User } from "../../../api/api.module";
import { Observable } from 'rxjs/Observable';

import { JsondataService } from '../services/jsondata.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
    currentText: any;
    
    constructor(private jsondataService: JsondataService) {
        document.getElementsByClassName("menuSelect")[0]['style'].display = "none";
        document.getElementsByClassName("menuTitle")[0]['style'].display = "none";

        this.jsondataService.currentRawData.subscribe((rawData: any) => {
            this.datasource = (request: DataSourceRequest): Observable<DataSourceResultOfUser> => {
                let data = this.jsondataService.getData(request);
                return data;
            }
        })
    }
    ngOnInit() {
    }

    public datasource: any = (request: DataSourceRequest): Observable<DataSourceResultOfUser> => {
        let data = this.jsondataService.getData(request);
        return data;
    }
}