import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IDoctor } from '../../interfaces/idoctor/idoctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient:HttpClient) {}

  doctorImg:BehaviorSubject<string> = new BehaviorSubject('');
  firstName:BehaviorSubject<string> = new BehaviorSubject('');
  lastName:BehaviorSubject<string> = new BehaviorSubject('');

  getAllDoctors():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/Doctor`);
  }


  getDoctorByID(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/Doctor/${id}`);
  }


  getDoctorByClinicID(clinicID:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/Doctor/by-clinic/${clinicID}`);
  }


  deleteDoctorByID(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}api/Doctor/${id}`);
  }


  updateDoctorUsingToken(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}api/Doctor/update`,data);
  }


}
