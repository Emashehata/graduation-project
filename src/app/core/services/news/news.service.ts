import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private httpClient:HttpClient ) { }

  getAllNews():Observable<any>{
    return this.httpClient.get('http://medicalcaree.runasp.net/api/NewsPost');
  }



  getSpecficNews(id:string | null):Observable<any>{
    return this.httpClient.get(`http://medicalcaree.runasp.net/api/NewsPost/${id}`);
  }



  postNews(data:object):Observable<any>{
    return this.httpClient.post('http://medicalcaree.runasp.net/api/NewsPost',data);
  }


  deleteSpecficNews(id:string | null):Observable<any>{
    return this.httpClient.delete(`http://medicalcaree.runasp.net/api/NewsPost/${id}`);
  }


}
