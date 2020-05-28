import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';  
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalCreatePesticideComponent} from '../modal-create-pesticide/modal-create-pesticide.component';
import { PesticideService } from '../services/pesticide.service';
import { Pesticide } from '../entities/pesticide';

@Component({
  selector: 'app-pesticide-sheet',
  templateUrl: './pesticide-sheet.component.html',
  styleUrls: ['./pesticide-sheet.component.css']
})
export class PesticideSheetComponent implements OnInit {

  pesticides : Pesticide[];

  constructor(
    private modalService: NgbModal,
    private pesticideSerivce : PesticideService
    ) { }

  ngOnInit() {
    this.loadPesticide();
  }

  loadPesticide() {
    this.pesticideSerivce.getAllPesticide().subscribe(
      res => {
        this.pesticides = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  open() {
    this.modalService.open(ModalCreatePesticideComponent);
  }

  change(pesticideId : number) {
    console.log(pesticideId);
  }
}
 