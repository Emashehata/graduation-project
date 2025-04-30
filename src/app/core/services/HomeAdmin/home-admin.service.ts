import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeAdminService {

  constructor(private httpClient:HttpClient) { }


  getCount():Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}api/HomeDashboard/overview`)
  }

  getHome():Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}api/HomeDashboard/dashboard`)
  }


  getAvailableAppointmentsByDay():Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}api/HomeDashboard/available-appointments-by-day`)
  }


}
