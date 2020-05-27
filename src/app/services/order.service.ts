import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerDTO } from '../dto/CustomerDTO';
import { OrderDTO } from '../dto/OrderDTO';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';

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

}
