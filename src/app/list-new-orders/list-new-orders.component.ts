import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { FullOrderDTO } from '../dto/FullOrderDTO';

@Component({
  selector: 'app-list-new-orders',
  templateUrl: './list-new-orders.component.html',
  styleUrls: ['./list-new-orders.component.css']
})
export class ListNewOrdersComponent implements OnInit {

  newOrders : FullOrderDTO[]

  constructor(private orderService : OrderService) { }

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

}
