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

    constructor(private jsondataService: JsondataService) {

    }
}