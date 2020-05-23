import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistryDTO } from '../dto/RegistryDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  public registryUser(registryDto : RegistryDTO) : Observable<any> {
    let url = `${environment.baseUrl}/user/registration`;

    return this.http.post(url, registryDto);
  }
}
