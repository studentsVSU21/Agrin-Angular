import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistryDTO } from '../dto/RegistryDTO';
import { InfoUserDTO } from '../dto/InfoUserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  public registryUser(registryDto : RegistryDTO) : Observable<any> {
    let url = `${environment.baseUrl}/user/registration`;

    return this.http.post(url, registryDto);
  }

  public registryOperator(registryDto : RegistryDTO) : Observable<any> {
    let url = `${environment.baseUrl}/user/registration/operator`;

    return this.http.post(url, registryDto);
  }

  getInfoUser() : Observable<InfoUserDTO> {
    let url = `${environment.baseUrl}/user/info`;
    return this.http.get<InfoUserDTO>(url);
  }

  refactor(infoUserDTO : InfoUserDTO) {
    let url = `${environment.baseUrl}/user/refactor`;

    return this.http.post(url, infoUserDTO);
  }
}