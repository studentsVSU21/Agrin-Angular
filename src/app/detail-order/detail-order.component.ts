import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { OrderService } from '../services/order.service';
import { DetailOrderDTO } from '../dto/DetailOrderDTO';
import { PesticideDTO } from '../dto/pesticideDTO';
import { Pesticide } from '../entities/pesticide';
import { AuthService } from '../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateExpenseReportComponent } from '../modal-create-expense-report/modal-create-expense-report.component';
import { ExpenseReportDTO } from '../dto/ExpenseReportDTO';
import { ModalChangeProccessAreaComponent } from '../modal-change-proccess-area/modal-change-proccess-area.component';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {

  nullOrder : boolean = false;
  id : number;
  detailOrder : DetailOrderDTO;
  pesticides : Pesticide[];

  expenseReports : ExpenseReportDTO[];

  constructor(
    private modalService: NgbModal,
    private activateRoute: ActivatedRoute,
    private orderService : OrderService,
    public authService : AuthService) 
  { 
    activateRoute.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit() {
    this.loadDetail();
    this.loadPesticide();
  }

  loadDetail() {
    this.orderService.getDetailOrder(this.id).subscribe(
      res => {
        console.log(res);
        this.detailOrder = res;
        if (res == null) {
          this.nullOrder = true;
        }
        else {
          if (this.authService.isManage())
            this.loadExpenseReporsts();
        }
      }, 
      err => {
        console.log(err);
      }
    );
  }

  loadPesticide() {
    this.orderService.getPesticides(this.id).subscribe(
      res => {
        console.log(res);
        this.pesticides = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  isOperator() {
    return this.authService.isOperator();
  }

  openReport() {
    console.log("Ds");
    const modalRef = this.modalService.open(ModalCreateExpenseReportComponent);
    console.log(this.pesticides);
    modalRef.componentInstance.pesticides = this.pesticides;
    modalRef.componentInstance.progressId = this.detailOrder.progress.progressID;

    modalRef.result.then(
      data => {
        this.loadExpenseReporsts();
      }
    )
  }

  loadExpenseReporsts() {
    console.log(this.detailOrder.progress.progressID);
    this.orderService.getExpenseReports(this.detailOrder.progress.progressID).subscribe(
      res => {
        console.log(res);
        this.expenseReports = res;
      },
      err => {
        console.log(err);
      }

    )
  }


  changeProccessArea() {
    console.log("change proccess area");
    let modalRef = this.modalService.open(ModalChangeProccessAreaComponent);
    modalRef.componentInstance.orderID = this.detailOrder.infoOrder.id;
    
    modalRef.result.then(
      data => {
        this.loadDetail();
      }
    )
  }

  completeOrder() {
    this.orderService.completeOrder(this.detailOrder.infoOrder.id).subscribe(
      res => {
        console.log(res);
        if (res['status'] == 'success') {
          this.loadDetail();
        }
      },
      err => {

      }
    )
  }

  reOrder() {
    this.orderService.reOrder(this.detailOrder.infoOrder.id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}