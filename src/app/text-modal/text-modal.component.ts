import { Component, OnInit, Input, Injectable } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JsondataService } from '../services/jsondata.service';
import { UidataService } from '../services/uidata.service';
import { DisqusModule } from 'ngx-disqus';


@Component({
	selector: 'app-text-modal',
	templateUrl: './text-modal.component.html',
	styleUrls: ['./text-modal.component.scss']
})

@Injectable()
export class TextModalComponent implements OnInit {

	status: string = "";
	disqus_shortname = 'crossingborders2';
	disqus_textname: string;
	data: any;
	selected: number = 0;
	selectedData: any;

	@Input() name;

	constructor(
		public activeModal: NgbActiveModal,
		private jsondataService: JsondataService,
		private uidataService: UidataService,
		) {
	}

	ngOnInit() {
		this.selectedData = this.data[this.selected];
		this.disqus_textname = this.jsondataService.getDataset()+"-"+this.data[this.selected].id;
		//this.jsondataService.getCommentCount(this.disqus_textname);
	}

	onNewComment(event){
		this.uidataService.setCommentMarker(this.data[this.selected]);
	}

	prev(d, event) {
		if (this.selected > 0) {
			this.selected--;
			this.selectedData = this.data[this.selected];
			this.disqus_textname = this.jsondataService.getDataset()+"-"+this.data[this.selected].id;
		}
	}
	next(d, event) {
		if (this.selected < this.data.length - 1) {
			this.selected++;
			this.selectedData = this.data[this.selected];
			this.disqus_textname = this.jsondataService.getDataset()+"-"+this.data[this.selected].id;
		}	
	}
}