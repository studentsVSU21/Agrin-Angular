import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';  
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import { RegistryDTO } from '../dto/RegistryDTO';


@Component({
  selector: 'app-modal-registration',
  templateUrl: './modal-registration.component.html',
  styleUrls: ['./modal-registration.component.css']
})
export class ModalRegistrationComponent implements OnInit {

  loadStatus = false;

  formControlFIO : FormControl;
  formControlPhone : FormControl;
  formControlEmail : FormControl;
  formControlPassword : FormControl;

  showError(formControl : FormControl) : boolean {
    console.log(formControl);
    console.log(formControl.invalid);
    console.log(formControl.touched);   
    let res =        ( formControl.invalid && formControl.touched ) || 
    ( this.loadStatus &&  formControl.invalid);
    console.log(res);
    return  res ;
  }

  constructor(
    public activeModal: NgbActiveModal,
    private userSerivce : UserService
    ) { }

  ngOnInit() {
    this.initFormControls();
  }

  initFormControls() {
    this.formControlPhone = new FormControl(
      "", [
        Validators.pattern("[0-9]{10}"),
        Validators.required
      ]
    );
    this.formControlEmail =  new FormControl(
      "", 
      [
        Validators.email,
        Validators.required
      ]
    );
    this.formControlFIO = new FormControl( "", Validators.required );
    this.formControlPassword = new FormControl( "", Validators.required);
  }

  checkValidFormControl() {
    return this.formControlPhone.valid &&
      this.formControlEmail &&
      this.formControlFIO && 
      this.formControlPassword;
  }

  createRegistyDTO() : RegistryDTO {
    return {
      password : this.formControlPassword.value,
      fio : this.formControlFIO.value,
      email : this.formControlEmail.value,
      phoneNumber : this.formControlPhone.value
    };
  }

  registry() {
    this.loadStatus = true;
    if (this.checkValidFormControl()) {
      this.userSerivce.registryUser( this.createRegistyDTO())
        .subscribe(
          res => {
            if (res["status"] == "success") {
              this.activeModal.close("success");
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
    }
  }
}
