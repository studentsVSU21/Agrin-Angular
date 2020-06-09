import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { InfoUserDTO } from '../dto/InfoUserDTO';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ModelRefactorInfoUserComponent } from '../model-refactor-info-user/model-refactor-info-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  userInfo : InfoUserDTO;

  constructor(
    private modalService: NgbModal,
    private authService : AuthService,
    private route : Router,
    private userService : UserService
  ) { }

  
  ngOnInit() {
    this.handleAuthorizate();
    this.loadInfoUser();
  }


  handleAuthorizate() {
    console.log("hanle");
    console.log(this.authService.isAuth());
    if (!this.authService.isAuth()) {
      this.route.navigate(['']);
    }
  }

  loadInfoUser() {
    this.userService.getInfoUser().subscribe(
      res => {
        console.log(res);
        this.userInfo = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  refactor() {
    let modalRef = this.modalService.open(ModelRefactorInfoUserComponent);
    modalRef.componentInstance.infoRefactorUser = this.userInfo;

    modalRef.result.then(
      data => {
        if (data == "refactor") {
          this.loadInfoUser();
        }
      }
    )
  }
}