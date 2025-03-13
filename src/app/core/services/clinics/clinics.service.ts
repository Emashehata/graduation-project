import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinicsService {

  constructor(private httpClient:HttpClient ) { }

  getAllClinics():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/Clinic`);
  }

  getSpecficClinic(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/Clinic/${id}`); 
  }

  addClinic(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}api/Clinic`,data);
  }

  deleteSpecficClinic(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}api/Clinic/${id}`);
  }

  updateSpecficClinic(id:string,data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}api/Clinic/${id}`,data);
  }

  searchInClinics(query:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/Clinic/search?query=${query}`);
  }

}
