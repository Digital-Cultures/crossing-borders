import { Component, OnInit } from '@angular/core';
import { UidataService } from './services/uidata.service';
import { JsondataService } from './services/jsondata.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: string = 'Crossing Borders';
    private dataSet: string = 'prophecy_of_the_six_kings';

    constructor(
        private uidataService: UidataService,
        private jsondataService: JsondataService
    ) { }

    ngOnInit() {

        this.jsondataService.setDataset(this.dataSet);
        if (window.location.href.slice(-2) != "db") {
            this.jsondataService.setMarkerDataset();
        }
    }

    changeData(e) {
        this.jsondataService.setDataset(e.target.value);
    }
}