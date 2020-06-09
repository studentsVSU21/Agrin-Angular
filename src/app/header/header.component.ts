import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ModalAuthComponent } from '../modal-auth/modal-auth.component';
import { ModalRegistrationComponent } from '../modal-registration/modal-registration.component';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private authService : AuthService) { }

  ngOnInit() {
  }

  open() {
    const modalRef = this.modalService.open(ModalAuthComponent);
  }

  openRegistry() {
    const modalRef = this.modalService.open(ModalRegistrationComponent).result
    .then(
      result => {
        if (result == "success") {
          this.router.navigate(['registration/info']);
        }
      }
    );
  }
 
  leave() {
    this.authService.logout();
  }

  isAuth() {
    return this.authService.isAuth();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isOperator() {
    return this.authService.isOperator();
  }
}