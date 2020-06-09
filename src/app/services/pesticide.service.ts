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

  saveExpenseReport(pesticideID : number, progressID : number, volume : number ) {
    console.log("save expense report ");
    let url = `${environment.baseUrl}/progress/create/expense/report`;

    let body = {
      progressId : progressID,
      pesticideId : pesticideID, 
      volume : volume
    }

    return this.http.post(url, body);
  }

  addVolume(pesticideID : number, volume : number ){
    let url = `${environment.baseUrl}/pesticide/manage/volume/add`;

    let body = {
      pesticideID : pesticideID,
      volume : volume
    };

    return this.http.post(url, body);
  }

  subtractVolume(pesticideID : number, volume : number ){
    let url = `${environment.baseUrl}/pesticide/manage/volume/subtract`;

    let body = {
      pesticideID : pesticideID,
      volume : volume
    };

    return this.http.post(url, body);
  }

}
