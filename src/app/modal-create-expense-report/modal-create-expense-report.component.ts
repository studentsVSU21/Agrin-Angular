import { Component, OnInit } from '@angular/core';
import { Pesticide } from '../entities/pesticide';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';  
import { FormControl, Validators } from '@angular/forms';
import { PesticideService } from '../services/pesticide.service';

@Component({
  selector: 'app-modal-create-expense-report',
  templateUrl: './modal-create-expense-report.component.html',
  styleUrls: ['./modal-create-expense-report.component.css']
})
export class ModalCreateExpenseReportComponent implements OnInit {

  invalidParametrs : boolean = false;
  errorParametrs : boolean = false;

  formControlPesticide : FormControl;
  pesticides : Pesticide[];
  formControlVolume : FormControl;

  progressId : number; 
  
  constructor(public activeModal: NgbActiveModal,
    private pesticideSrvice : PesticideService ) { }

  ngOnInit() {
    this.initFormControl();
  }

  initFormControl() {
    this.formControlPesticide = new FormControl("-1", Validators.required);
    this.formControlVolume = new FormControl("", [
      Validators.required,
      Validators.pattern('[0-9]{0-4}')
    ]);
  }

  showError() {
    return this.formControlPesticide.value == -1 &&
      this.formControlVolume.invalid
    ;
  }

  saveExpenseReport() {
    console.log("expense report");
    this.invalidParametrs = this.showError();
    console.log(this.invalidParametrs);
    if (!this.invalidParametrs) {
      console.log(`progressID : ${this.progressId}`)
      this.pesticideSrvice.saveExpenseReport(
        this.formControlPesticide.value,
        this.progressId,
        this.formControlVolume.value
      ).subscribe(
        res => {
          console.log(res);
          if (res["status"] == "success")
            this.activeModal.close();
          if ( res["status"] == "failure") {
            this.errorParametrs = true;
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

}