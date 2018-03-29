import { Component, OnInit, Input, Injectable } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
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
	data: any;
	selected: number = 0;
	selectedData: any;

	@Input() name;

	constructor(
		public activeModal: NgbActiveModal,
		private http: HttpClient) {
	}

	ngOnInit() {
		this.selectedData = this.data[this.selected];
	}

	prev(d, event) {
		if (this.selected > 0) {
			this.selected--;
			this.selectedData = this.data[this.selected];
		}
	}
	next(d, event) {
		if (this.selected < this.data.length - 1) {
			this.selected++;
			this.selectedData = this.data[this.selected];
		}	
	}
}