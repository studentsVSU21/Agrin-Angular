import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';  
import { Pesticide } from '../entities/pesticide';
import { PesticideService } from '../services/pesticide.service';
import { FormControl, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-modal-confirm-order',
  templateUrl: './modal-confirm-order.component.html',
  styleUrls: ['./modal-confirm-order.component.css']
})
export class ModalConfirmOrderComponent implements OnInit {

  orderID : number;
  startDate: NgbDateStruct;
  endDate : NgbDateStruct;
  formControlStartDate : FormControl;
  formControlEndDate : FormControl;
  pesticides : Pesticide[];
  formControlPesticide : FormControl;


  constructor(public activeModal: NgbActiveModal,
    private pesticideService : PesticideService, 
    private orderService : OrderService
    ) { }

  ngOnInit() {
    this.initFormControl();
    this.loadPesticides();
  }

  initFormControl() {
    this.formControlStartDate = new FormControl("", Validators.required);
    this.formControlPesticide = new FormControl("-1", Validators.required);
    this.formControlEndDate = new FormControl("", Validators.required); 
  }

  confirm() {

    let pesticideID = this.formControlPesticide.value as number;

    this.activeModal.close(
      {
        orderId : null,
        pesticideId : pesticideID ,
        startDate : new Date(this.startDate.year, this.startDate.month, this.startDate.day),
        endDate : new Date(this.endDate.year, this.endDate.month, this.endDate.day)
      }
    );
  }

  loadPesticides() {
    this.pesticideService.getAllPesticide().subscribe(
      res => {
        console.log(res);
        this.pesticides = res;
      },
      err => {
        console.log(err);
      }
    )
  }
}