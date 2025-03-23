import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private httpClient:HttpClient) { }


  CreateAppointment(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}api/Appointment`,data)
  }

  UpdateAppointment(id:string,data:object):Observable<any>
  {
    return this.httpClient.put(`${environment.baseUrl}api/Appointment/${id}`,data)
  }

  DeleteAppointment(id:string):Observable<any>
  {
    return this.httpClient.delete(`${environment.baseUrl}api/Appointment/${id}`)
  }

  availableSlotsForDoctor(doctorId:string):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}api/Appointment/AvailableSlots?doctorId=${doctorId}`)
  }

  DoctorAppointments():Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}api/Appointment/DoctorAppointments`)
  }

  Appointments():Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}api/Appointment`)
  }

  AppointmentById(id:string):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}api/Appointment/${id}`)
  }

}

