import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IDoctor } from '../../interfaces/idoctor/idoctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient:HttpClient) {
    this.loadDoctorDataFromStorage();
  }

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
    return this.httpClient.get(`${environment.baseUrl}api/Doctor/${clinicID}`);
  }


  deleteDoctorByID(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}api/Doctor/${id}`);
  }


  updateDoctorUsingToken(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}api/Doctor/update`,data);
  }

  saveDoctorData(doctor:any): void {
    this.doctorImg.next(doctor.imageUrl);
    this.firstName.next(doctor.firstName);
    this.lastName.next(doctor.lastName);

    // Save to localStorage
    localStorage.setItem('doctorImg', doctor.imageUrl);
    localStorage.setItem('firstName', doctor.firstName);
    localStorage.setItem('lastName', doctor.lastName);
  }
  loadDoctorDataFromStorage(): void {
    const img = localStorage.getItem('doctorImg');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');

    if (img && firstName && lastName) {
      this.doctorImg.next(img);
      this.firstName.next(firstName);
      this.lastName.next(lastName);
    }}
}
