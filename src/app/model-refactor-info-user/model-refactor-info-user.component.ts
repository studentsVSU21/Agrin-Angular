import { Component, OnInit } from '@angular/core';
import { InfoUserDTO } from '../dto/InfoUserDTO';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';  
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-model-refactor-info-user',
  templateUrl: './model-refactor-info-user.component.html',
  styleUrls: ['./model-refactor-info-user.component.css']
})
export class ModelRefactorInfoUserComponent implements OnInit {

  infoRefactorUser: InfoUserDTO;
  invalidParametrs : boolean = false;

  formControlFIO : FormControl;
  formControlPhone : FormControl;
  formControlEmail : FormControl;

  constructor(    public activeModal: NgbActiveModal,
    private userSerivce : UserService) { }

  ngOnInit() {
    this.initFormControls();
  }


  initFormControls() {
    this.formControlPhone = new FormControl(
      this.infoRefactorUser.phoneNumber, [
        Validators.pattern("[0-9]{10}"),
        Validators.required
      ]
    );
    this.formControlEmail =  new FormControl(
      this.infoRefactorUser.email, 
      [
        Validators.email,
        Validators.required
      ]
    );
    this.formControlFIO = new FormControl( this.infoRefactorUser.fio, Validators.required );
  }

  showError() : boolean {
    console.log(this.formControlFIO.invalid);
    console.log(this.formControlEmail.invalid);
    console.log(this.formControlPhone.invalid);
    return this.formControlFIO.invalid &&
      this.formControlEmail.invalid && 
      this.formControlPhone.invalid;
  }

  save() {
    this.invalidParametrs = this.showError();
    console.log("sava user");
    if (!this.invalidParametrs) {
      this.userSerivce.refactor({
        userId : this.infoRefactorUser.userId,
        email : this.formControlEmail.value,
        phoneNumber : this.formControlPhone.value,
        fio : this.formControlFIO.value
      }).subscribe(
        res => {
          console.log(res);
          if (res["status"] == "success") 
            this.activeModal.close("refactor");
        },
        err => {
          console.log(err);
        }
      )
    }
  }
}