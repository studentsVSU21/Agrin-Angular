import { Component, OnInit, Input  } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';  
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ACCESS_TOKEN } from '../services/auth.service';

@Component({
  selector: 'app-modal-auth',
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.css']
})
export class ModalAuthComponent implements OnInit {

  authAttempt : boolean;

  formLogin : FormControl;
  fromPassword : FormControl;

  constructor(
    public activeModal: NgbActiveModal,
    private authService : AuthService) { }

  ngOnInit() {
    this.initFormControl();
  }

  initFormControl() {
    this.formLogin = new FormControl('', 
      Validators.required
    );
    this.fromPassword = new FormControl('',
      Validators.required
    );
  }
  

  checkValidForm() {
    console.log(this.fromPassword.valid);
    console.log(this.formLogin.valid);
    return this.fromPassword.valid &&
      this.formLogin.valid;
  }

  auth() {
    console.log("auth");
    if (this.checkValidForm()) {
      this.authAttempt = true;
      let authData = this.authService.createAuth(this.formLogin.value, this.fromPassword.value);
      this.authService.authUser(authData).subscribe(
        res => {
          this.authService.validAuth(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
