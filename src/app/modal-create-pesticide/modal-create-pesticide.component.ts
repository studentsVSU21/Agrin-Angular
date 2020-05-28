import { Component, OnInit } from '@angular/core';
import { PesticideService } from '../services/pesticide.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';  
import { FormControl, Validators } from '@angular/forms';
import { PesticideDTO } from '../dto/pesticideDTO';

@Component({
  selector: 'app-modal-create-pesticide',
  templateUrl: './modal-create-pesticide.component.html',
  styleUrls: ['./modal-create-pesticide.component.css']
})
export class ModalCreatePesticideComponent implements OnInit {

  click : boolean;

  formName : FormControl;
  formVolume : FormControl;

  constructor(
    public activeModal: NgbActiveModal,
    private pesticideSerivce : PesticideService) { }

  ngOnInit() {
    this.initFormControl();
  }

  initFormControl() {
    this.formName = new FormControl('', Validators.required);
    this.formVolume = new FormControl('', Validators.required);
  }

  validForm() {
    return this.formName.valid && this.formVolume.valid;
  }

  invalidForm(formControl : FormControl) {
    return (formControl.invalid && formControl.touched) ||
      (formControl.invalid && this.click);
  }

  addingPesticide() {
    this.click = true;
    if (this.validForm) {
      let pesticideDto : PesticideDTO = {name : this.formName.value, volume : this.formVolume.value};
      this.pesticideSerivce.addPesticide(pesticideDto).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
