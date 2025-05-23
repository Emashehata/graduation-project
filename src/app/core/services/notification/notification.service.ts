import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { INotification } from '../../interfaces/INotification/inotification';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  // private notificationsSignal: WritableSignal<INotification[] | null> = signal(null);
  // notifications = this.notificationsSignal;

  constructor(private httpClient: HttpClient) {}

  countUnRead:BehaviorSubject<number>=new BehaviorSubject(0);
  readonly countUnRead$ = this.countUnRead.asObservable();

  getAllNotifications(): Observable<INotification[]> {
    return this.httpClient.get<INotification[]>(`${environment.baseUrl}api/Notification`);
  }
 
  
  
  getUnReadNotifications(): Observable<any> {
    return this.httpClient.get<INotification[]>(`${environment.baseUrl}api/Notification/NumberOfUnread`);
  }



  markAsRead(notificationId: number): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}api/Notification/mark-as-read/${notificationId}`, {});
  }

//  getUnReadNotification(){
//       this.getUnReadNotifications().subscribe({
//         next:(res)=>{
//           console.log(res);
//           this.countUnRead.next(res);


//         }
//       })
//     }
getUnReadNotification() {
  this.getUnReadNotifications().subscribe({
    next: (res: number) => {
      console.log('🔔 Unread count from API:', res);
      this.countUnRead.next(res);
    },
    error: (err) => {
      console.error('❌ Failed to fetch unread notifications', err);
    }
  });
}

 getSpecficNotifications(id:string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}api/Notification/${id}`);
  }
}
