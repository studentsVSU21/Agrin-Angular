import { Component, OnInit } from '@angular/core';
import { FullOrderDTO } from '../dto/FullOrderDTO';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-current-orders',
  templateUrl: './current-orders.component.html',
  styleUrls: ['./current-orders.component.css']
})
export class CurrentOrdersComponent implements OnInit {

  currentOrders : FullOrderDTO[]

  constructor(
    private orderService : OrderService
  ) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders( )
  {
    this.orderService.loadCurrentOrders().subscribe(
      res => {
        console.log(res);
        this.currentOrders = res;
      },
      err => {
        console.log(err);
      }
    )
  }

}