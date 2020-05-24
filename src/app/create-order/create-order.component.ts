import { Component, OnInit } from '@angular/core';
import {RegionService } from '../services/region.service';
import { RegionDTO } from '../dto/RegionDTO';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  listsRegion : RegionDTO[];

  constructor(
    private regionService : RegionService) { }

  ngOnInit() {
    this.getRegionList()
  }


  getRegionList() {
    this.regionService.getListsRegion().subscribe(
      res => {
        this.listsRegion = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

}
