import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import e from 'express';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  constructor(private httpClient:HttpClient) { }

  Examinationpatient(id:string):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}api/Examination/patient/${id}`);
  }

  ExaminationDoctor():Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}api/Examination/doctor`);
  }

  UpdateExamination(id:string , data:object):Observable<any>
  {
    return this.httpClient.put(`${environment.baseUrl}api/Examination/${id}`,data)
  }

  DeleteExamination(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}api/Examination/${id}`);
  }
  
  GetExaminationById(id:string):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}api/Examination/${id}`)
  }

  AddExamination(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}api/Examination`,data)
  }

}
