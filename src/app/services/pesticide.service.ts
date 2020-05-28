import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Pesticide } from '../entities/pesticide';
import { PesticideDTO } from '../dto/pesticideDTO';

@Injectable({
  providedIn: 'root'
})
export class PesticideService {

  constructor(private http : HttpClient) { }

  addPesticide(pesticideDTO : PesticideDTO) : Observable<any> {
    let url = `${environment.baseUrl}/pesticide/manage/add`;

    return this.http.post(url, pesticideDTO);
  }

  getAllPesticide() : Observable<Pesticide[]> {
    let url = `${environment.baseUrl}/pesticide/manage/all`;

    return this.http.get<Pesticide[]>(url);
  }
}
