import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PesticideService } from '../services/pesticide.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-change-volume-pesticide',
  templateUrl: './modal-change-volume-pesticide.component.html',
  styleUrls: ['./modal-change-volume-pesticide.component.css']
})
export class ModalChangeVolumePesticideComponent implements OnInit {


  pesticideID : number;
  formControlVolume : FormControl;

  constructor(
    public activeModal: NgbActiveModal,
    private pesticideService: PesticideService
  ) { }

  ngOnInit() {
    this.initFormControl();
  }

  initFormControl() {
    this.formControlVolume = new FormControl("", 
    [
      Validators.required,
      Validators.pattern('[0-9]{1-4}')
    ]);
  }

  add() {
    this.pesticideService.addVolume(
      this.pesticideID, 
      this.formControlVolume.value
    ).subscribe(
      res =>{
        if (res["status"] == "success") {
          this.activeModal.close();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  subtract() {
    this.pesticideService.subtractVolume(
      this.pesticideID, 
      this.formControlVolume.value
    ).subscribe(
      res =>{
        if (res["status"] == "success") {
          this.activeModal.close();
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}