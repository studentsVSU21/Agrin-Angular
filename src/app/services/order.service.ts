import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CustomerDTO } from '../dto/CustomerDTO';
import { OrderDTO } from '../dto/OrderDTO';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';
import { FullOrderDTO } from '../dto/FullOrderDTO';
import { AuthService } from './auth.service';
import { FullOrderDTOWithStatus } from '../dto/FullOrderDTOWithStatus';
import { ConfirmationOrderDTO } from '../dto/ConfirmOrderDTO';
import { DetailOrderDTO } from '../dto/DetailOrderDTO';
import { Pesticide } from '../entities/pesticide';
import { ExpenseReportDTO } from '../dto/ExpenseReportDTO'; 

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient,
    private auhtService : AuthService) { }

  generateCustomer(fio : string, phone : string, mail : string) : CustomerDTO {
    return {
      fio : fio,
      phone : phone,
      mail : mail
    }
  }

  generateOrder(customer : CustomerDTO, area : number, regionID : number, dateOrder : Date) : OrderDTO {
    return {
      customer : customer,
      area : area,
      regionID : regionID,
      date : dateOrder
    };
  }

  createOrder(order : OrderDTO) : Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json"); 
    if (this.auhtService.isAuth()) {
      let url = `${environment.baseUrl}/order/user/create`;
      console.log(order);
  
      return this.http.post(url, order, {headers : headers} );
    }
    else {
      let url = `${environment.baseUrl}/order/custom/creation`;
      console.log(order);

      return this.http.post(url, order, {headers : headers} );
    }
  }

  loadNewOrders() : Observable<FullOrderDTO[]> {
    let url = `${environment.baseUrl}/order/new/orders`;

    return this.http.get<FullOrderDTO[]>(url);
  }

  rejectOrder(orderID : number) : Observable<any>{
    let url = `${environment.baseUrl}/order/reject?orderId=${orderID}`;

    return this.http.post(url, {});
  }

  getOrdersOfUser() : Observable<FullOrderDTOWithStatus[]> {
    let url = `${environment.baseUrl}/order/custom/user`;

    return this.http.get<FullOrderDTOWithStatus[]>(url);
  }

  confirmOrder(confirmationOrderDTO : ConfirmationOrderDTO) {
    let url = `${environment.baseUrl}/order/confirm`;

    return this.http.post(url, confirmationOrderDTO);
  }

  loadCurrentOrders() : Observable<FullOrderDTO[]> {
    let url = `${environment.baseUrl}/order/current`;

    return this.http.get<FullOrderDTO[]>(url);
  }

  getDetailOrder(id : number) : Observable<DetailOrderDTO> {
    let url = `${environment.baseUrl}/order/detail?id=${id}`;

    return this.http.get<DetailOrderDTO>(url);
  }

  getPesticides( id : number) : Observable<Pesticide[]> {
    let url = `${environment.baseUrl}/order/pesticides?orderId=${id}`;

    return this.http.get<Pesticide[]>(url);
  }

  getExpenseReports( progressId : number ) : Observable<ExpenseReportDTO[]> {
    let url = `${environment.baseUrl}/progress/expense/reports?progressId=${progressId}`;
    console.log(url);
    return this.http.get<ExpenseReportDTO[]>(url);
  }

  changeProccessArea(orderId : number, processArea : number) {
    let url = `${environment.baseUrl}/order/change/process/area`;

    let body = {
      orderID : orderId,
      processArea : processArea
    };

    return this.http.post(url, body);
  }

  completeOrder( orderId : number ) {
    console.log("complete order");
    let url = `${environment.baseUrl}/order/complete`;

    let body = {
      orderId : orderId
    };

    return this.http.post(url, body)
  } 

  reOrder(orderID : number ) {
    let url = `${environment.baseUrl}/order/reorder?orderID=${orderID}`;

    return this.http.post(url, {});
  }

}