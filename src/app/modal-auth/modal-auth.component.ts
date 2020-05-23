import { Component, OnInit, Input  } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';  

@Component({
  selector: 'app-modal-auth',
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.css']
})
export class ModalAuthComponent implements OnInit {

  @Input() name;
  

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
