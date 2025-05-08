import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { INotification } from '../../interfaces/INotification/inotification';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  // private notificationsSignal: WritableSignal<INotification[] | null> = signal(null);
  // notifications = this.notificationsSignal;

  constructor(private httpClient: HttpClient) {}

  getAllNotifications(): Observable<INotification[]> {
    return this.httpClient.get<INotification[]>(`${environment.baseUrl}api/Notification`);
  }



  markAsRead(notificationId: number): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}api/Notification/mark-as-read/${notificationId}`, {});
  }


}
