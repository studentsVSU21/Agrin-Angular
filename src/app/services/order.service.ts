import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CustomerDTO } from '../dto/CustomerDTO';
import { OrderDTO } from '../dto/OrderDTO';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';
import { FullOrderDTO } from '../dto/FullOrderDTO';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }

  generateCustomer(fio : string, phone : string, mail : string) : CustomerDTO {
    return {
      fio : fio,
      phone : phone,
      mail : mail
    }
  }

  generateOrder(customer : CustomerDTO, area : number, regionID : number) : OrderDTO {
    return {
      customer : customer,
      area : area,
      regionID : regionID,
    }
  }

  createOrder(order : OrderDTO) : Observable<any> {
    let url = `${environment.baseUrl}/order/custom/creation`;
    console.log(order);

    let headers = new HttpHeaders().set("Content-Type", "application/json"); 

    return this.http.post(url, order, {headers : headers} );
  }

  loadNewOrders() : Observable<FullOrderDTO[]> {
    let url = `${environment.baseUrl}/order/new/orders`;

    return this.http.get<FullOrderDTO[]>(url);
  }

  rejectOrder(orderID : number) : Observable<any>{
    let url = `${environment.baseUrl}/order/reject?orderId=${orderID}`;

    return this.http.post(url, {});
  }

}