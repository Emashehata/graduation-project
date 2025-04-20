import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient:HttpClient) { }

  createBooking(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}api/Booking`,data);
  }

  deleteBooking(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}api/Booking/DeleteBooking/${id}`);
  }

  patientBookings():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/Booking/PatientBookings`);
  }

  doctorBookings():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/Booking/DoctorBookings`);
  }

  allBooking():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/Booking`);
  }

  


}
