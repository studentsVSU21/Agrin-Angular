import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ModalAuthComponent } from '../modal-auth/modal-auth.component';
import { ModalRegistrationComponent } from '../modal-registration/modal-registration.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private router: Router) { }

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
}