import { Component, OnInit } from '@angular/core';
import {RegionService } from '../services/region.service';
import { RegionDTO } from '../dto/RegionDTO';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { OrderDTO } from '../dto/OrderDTO';
import { OrderService } from '../services/order.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';  

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  listsRegion : RegionDTO[];
  blockData : boolean = false;

  formControlFIO : FormControl;
  formControlPhone : FormControl;
  formControlEmail : FormControl;
  formConrtolArea : FormControl;
  formControlRegion : FormControl;
  formControlData : FormControl;

  clickCreate : boolean = false;

  successOrder : boolean;
  failureOrder : boolean;

  constructor(
    private regionService : RegionService,
    private orderService : OrderService) { }

  ngOnInit() {
    this.getRegionList();
    this.initFormControl();
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

  initFormControl() {
    this.formControlRegion = new FormControl( '-1', [Validators.required, Validators.pattern("[0-9]{1,11}")] );
    this.formConrtolArea = new FormControl(
      "",
      [
        Validators.pattern("[0-9]{1,4}"),
        Validators.required
      ]
    );
    this.formControlPhone = new FormControl(
      "", [
        Validators.pattern("[0-9]{10}"),
        Validators.required
      ]
    );
    this.formControlEmail =  new FormControl(
      "", 
      [
        Validators.email,
        Validators.required
      ]
    );
    this.formControlFIO = new FormControl( "", Validators.required );
    this.formControlData = new FormControl("", [
      Validators.required
    ]);
  }

  checkValidForm() : boolean {
    console.log(this.formControlData.valid);
    console.log(this.formControlData.value);
    return  this.formControlFIO.valid && 
      this.formConrtolArea.valid && 
      this.formControlEmail.valid && 
      this.formControlPhone.valid && 
      this.formControlRegion.valid && 
      this.formControlData.valid;
  }



  createOrder()  {
    this.blockData = false;
    let date =this.formControlData.value as NgbDateStruct;
    this.clickCreate = true;
    console.log(this.formConrtolArea.valid);
    console.log("check")
    let res = this.checkValidForm();
    console.log(res);
    if (this.checkValidForm()) { 
      console.log("valid");
      let customer = this.orderService.generateCustomer(
        this.formControlFIO.value,
        this.formControlPhone.value,
        this.formControlEmail.value
      );
      let order = this.orderService.generateOrder(
        customer,
        this.formConrtolArea.value as number,
        this.formControlRegion.value as number,
        new Date(date.year, date.month, date.day)
      );
      this.orderService.createOrder(order).subscribe(
        res => {
          if (res['status'] == 'success') {
            this.successOrder = true;
          }
          if (res['status'] == 'failure' && res['message'] == 'blackList') {
            this.blockData = true;
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  showError(formControl : FormControl) : boolean {   
    console.log(formControl.value);
    let res = ( formControl.invalid && formControl.touched) || 
      (this.clickCreate && formControl.invalid );
    return res ;
  }
}