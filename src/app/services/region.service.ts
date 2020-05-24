import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RegionDTO } from '../dto/RegionDTO'; 

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private http : HttpClient) { }

  getListsRegion() : Observable<any> {
    let url = `${environment.baseUrl}/region/list`;

    return this.http.get<RegionDTO[]>(url);
  }
}
