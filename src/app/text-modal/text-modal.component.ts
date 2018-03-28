import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-text-modal',
  templateUrl: './text-modal.component.html',
  styleUrls: ['./text-modal.component.scss']
})
export class TextModalComponent implements OnInit {
  
  status: string = "";

  @Input() name;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  	
  }

  clicked(d, event) {
  	console.log(d.name);
  	this.status = d.id;      
  	var disqus_shortname = 'crossingborders2'; // Replace this value with *your* username.

	  // ajax request to load the disqus javascript
	  // $.ajax({
	  //         type: "GET",
	  //         url: "http://" + disqus_shortname + ".disqus.com/embed.js",
	  //         dataType: "script",
	  //         cache: true
	  // });
	  // // hide the button once comments load
	  // $(this).fadeOut();

 //  	DISQUS.reset({
	//   reload: true,
	//   config: function () {  
	//     this.page.identifier = "newidentifier";  
	//     this.page.url = "http://example.com/#!newthread";
	//   }
	// });
  }
}