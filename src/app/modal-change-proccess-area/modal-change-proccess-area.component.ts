import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-modal-change-proccess-area',
  templateUrl: './modal-change-proccess-area.component.html',
  styleUrls: ['./modal-change-proccess-area.component.css']
})
export class ModalChangeProccessAreaComponent implements OnInit {

  formControlArea : FormControl;
  orderID : number;
  errorAdding : boolean  = false;

  constructor(
    public activeModal: NgbActiveModal,
    private orderService : OrderService
  ) { }

  ngOnInit() {
    this.formControlArea = new FormControl('', [Validators.required]);
  }

  add() {
    this.errorAdding = false;
    this.orderService.changeProccessArea(this.orderID, this.formControlArea.value)
      .subscribe(
        res => {
          console.log(res);
          if (res["status"] == "success") {
            this.activeModal.close();
          }
          if (res["status"] == 'failure' ) {
            this.errorAdding = true;
          }
        },
        err => {
          console.log(err);
        }
      );
  }
}