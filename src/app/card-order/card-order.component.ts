import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.css']
})
export class CardOrderComponent implements OnInit {

  @Input() order;

  constructor() { }

  ngOnInit() {
  }

}
