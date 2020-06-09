import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { RegistryDTO } from '../dto/RegistryDTO';

@Component({
  selector: 'app-create-operator-account',
  templateUrl: './create-operator-account.component.html',
  styleUrls: ['./create-operator-account.component.css']
})
export class CreateOperatorAccountComponent implements OnInit {

  loadStatus = false;
  mailBusy = false;
  successRegistry = false;

  formControlFIO : FormControl;
  formControlPhone : FormControl;
  formControlEmail : FormControl;
  formControlPassword : FormControl;

  constructor(
    private authService : AuthService,
    private route : Router,
    private userService : UserService
  ) { }

  ngOnInit() {
    this.checkValid();
    this.initFormControls();
  }

  checkValid() {
    if (!this.authService.isAdmin()) {
      this.route.navigate(["/"])
    }
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

  showError() : boolean {
    let res = this.formControlFIO.invalid ||
      this.formControlPhone.invalid ||
      this.formControlEmail.invalid ||
      this.formControlPassword.invalid;
    return res;
  }

  zeroing() {
    this.successRegistry = false;
    this.mailBusy = false;
  }

  reg() {
    this.zeroing();
    this.loadStatus = this.showError();
    if (!this.loadStatus) {
      let regDTO : RegistryDTO = {
        fio : this.formControlFIO.value,
        email : this.formControlEmail.value,
        phoneNumber : this.formControlPhone.value,
        password : this.formControlPassword.value
      }
      this.userService.registryOperator(regDTO).subscribe(
        res => {
          console.log(res);
          if (res["status"] == "success") {
            this.successRegistry = true;
          }
          if (res["status"] == "failure") {
            switch (res["message"]) {
              case "Email is busy" : 
                this.mailBusy = true;
                break;
            }
          }
        }, 
        err => {
          console.log(err);
        }
      )
    }
  }
}