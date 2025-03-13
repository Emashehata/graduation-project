import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient:HttpClient) {
    this.loadPatientDataFromStorage();
   }
    patientImg:BehaviorSubject<string> = new BehaviorSubject('');
    patientFirstName:BehaviorSubject<string> = new BehaviorSubject('');
    patientLastName:BehaviorSubject<string> = new BehaviorSubject('');

    getAllPatients():Observable<any>{
      return this.httpClient.get(`${environment.baseUrl}api/Patient/All_Users`);
    }


    getPatientByToken():Observable<any>{
      return this.httpClient.get(`${environment.baseUrl}api/Patient`);
    }





    deleteUserByID(id:string):Observable<any>{
      return this.httpClient.delete(`${environment.baseUrl}api/Patient/${id}`);
    }


    updatePatientUsingToken(data:object):Observable<any>{
      return this.httpClient.put(`${environment.baseUrl}api/Patient`,data);
    }


    savePatientData(patient:any): void {
      this.patientImg.next(patient.imageUrl);
      this.patientFirstName.next(patient.firstName);
      this.patientLastName.next(patient.lastName);

      // Save to localStorage
      localStorage.setItem('patientImg', patient.imageUrl);
      localStorage.setItem('patientFirstName', patient.firstName);
      localStorage.setItem('patientLastName', patient.lastName);
    }
    loadPatientDataFromStorage(): void {
      const img = localStorage.getItem('patientImg');
      const firstName = localStorage.getItem('patientFirstName');
      const lastName = localStorage.getItem('patientLastName');

      if (img && firstName && lastName) {
        this.patientImg.next(img);
        this.patientFirstName.next(firstName);
        this.patientLastName.next(lastName);
      }}
}
