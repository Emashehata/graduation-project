import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Feedback } from '../../interfaces/IFeedback/ifeedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private httpClient:HttpClient) { }



  addFeedback(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}api/Feedback` , data)
  }

  // getFeedback():Observable<any>
  // {
  //   return this.httpClient.get(`${environment.baseUrl}api/Feedback`)
  // }

  getFeedback(): Observable<Feedback[]> {
    return this.httpClient.get<Feedback[]>(`${environment.baseUrl}api/Feedback`);
  }
}
