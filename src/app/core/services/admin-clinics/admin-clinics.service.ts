 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminClinicsService {

  constructor(private httpClient:HttpClient) { }

  getBookingsData():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/PatientDashboard/Bookings`)
  }
}
