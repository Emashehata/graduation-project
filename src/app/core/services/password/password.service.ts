import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private httpClient:HttpClient) { }

  forgetPassword(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}api/Authentication/Forget-Password`,data,{
       responseType: 'text'
    });

  }
  verifyCode(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}api/Authentication/Verify-Code`,data,{
      responseType: 'text'
   });
  }
  resetPasswordAfterVervication(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}api/Authentication/Reset-Password`,data,{
      responseType: 'text'
   });
  }
}
