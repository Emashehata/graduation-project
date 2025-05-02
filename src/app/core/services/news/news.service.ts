import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private httpClient:HttpClient ) { }

  getAllNews():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/NewsPost`);
  }



  getSpecficNews(id:string | null):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/NewsPost/${id}`);
  }



  postNews(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}api/NewsPost`,data);
  }
  updateNews(data:object,id:string | null):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}api/NewsPost/${id}`,data);
  }


  deleteSpecficNews(id:string | null):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}api/NewsPost/${id}`);
  }


}
