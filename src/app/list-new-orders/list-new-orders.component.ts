import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { FullOrderDTO } from '../dto/FullOrderDTO';
import {NgbModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmOrderComponent } from '../modal-confirm-order/modal-confirm-order.component';
import { ConfirmationOrderDTO } from '../dto/ConfirmOrderDTO';


@Component({
  selector: 'app-list-new-orders',
  templateUrl: './list-new-orders.component.html',
  styleUrls: ['./list-new-orders.component.css']
})
export class ListNewOrdersComponent implements OnInit {

  model: NgbDateStruct;
  newOrders : FullOrderDTO[]

  constructor(
    private modalService: NgbModal,
    private orderService : OrderService) { }

  ngOnInit() {
    this.loadNewOrders();
  }


  loadNewOrders() {
    this.orderService.loadNewOrders().subscribe(
      res => {
        this.newOrders = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  rejectOrder(orderId : number) {
    this.orderService.rejectOrder(orderId).subscribe(
      res => {
        this.loadNewOrders();
        console.log(res);
      },
      err => {
        this.loadNewOrders();
        console.log(err);
      }
    )
  }

  openModalConfirm(orderId : number) {
    this.modalService.open(ModalConfirmOrderComponent).result.then(
      res => {
        console.log(res);
        let confirmDTO = res as ConfirmationOrderDTO;
        confirmDTO.orderId = orderId;
        console.log(confirmDTO);
        this.confirm(confirmDTO);
      },
      err => {
        console.log(err);
      }
    );
  }

  confirm( confirmOrder : ConfirmationOrderDTO) {
    this.orderService.confirmOrder(confirmOrder).subscribe(
      res => {
        console.log(res);
        this.loadNewOrders();
      },
      err => {
        console.log(err);
      }
    )
  }

}