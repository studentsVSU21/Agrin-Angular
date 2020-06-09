import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service'; 
import { FullOrderDTOWithStatus } from '../dto/FullOrderDTOWithStatus';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  ordersOfUser : FullOrderDTOWithStatus[];

  constructor(
    private orderService : OrderService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.orderService.getOrdersOfUser().subscribe(
      res => {
        this.ordersOfUser = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }
}