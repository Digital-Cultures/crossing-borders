import { Component, OnInit } from '@angular/core';
import { UidataService } from './services/uidata.service';
import { JsondataService } from './services/jsondata.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: string = '<i><b>Prophecies of Merlin</b></i> (ORIGINAL: ENGLAND, LATIN, c. 1136)';
    private dataSet: string = 'proffwydoliaeth_merdin';

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
        switch(e.target.value) {
            case 'prophecy_of_the_six_kings':
             this.title = '<i><b>Prophecy of the Six Kings</b></i> (ORIGINAL: ENGLAND, ANGLO-NORMAN, c. 1310s-20s)';
              break;
            case 'life_of_st_edward':
                this.title = '<i><b>Life of St Edward</b></i> (ORIGINAL: ENGLAND, LATIN, c. 1150)';
                 break;
            case 'pseudo_turpin':
                this.title = '<i><b>Pseudo-Turpin Chronicle</b></i> (ORIGINAL: FRANCE, LATIN, c. 1140';
                break;
            case 'bevis':
                this.title = '<i><b>Bevis of Hampton</b></i> (ORIGINAL: ENGLAND, ANGLO-NORMAN, LATE TWELFTH CENTURY)';
                break;
            case 'fierabras':
                this.title = '<i><b>Fierabras</b></i> (ORIGINAL: FRANCE, FRENCH, c. 1170)';
                break;
            case 'roman_alexandre':
                this.title = '<i><b>Alexander</b></i> (ORIGINAL: FRANCE, FRENCH, LATE TWELFTH CENTURY)';
                break;
            case 'elucidarium':
                this.title = '<i><b>Elucidarium</b></i> (ORIGINAL: ENGLAND/GERMANY, LATIN, c. 1098)';
                break;
            case 'marwolaeth_mair':
                this.title = '<i><b>Assumption of the Virgin Mary</b></i> (?)';
                break;
            case 'proffwydoliaeth_merdin':
                this.title = '<i><b>Prophecies of Merlin</b></i> (ORIGINAL: ENGLAND, LATIN, c. 1136)';
                break;
            default:
              // code block
          }
    }
}