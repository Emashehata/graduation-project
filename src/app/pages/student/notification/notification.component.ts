import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { INotification } from '../../../core/interfaces/INotification/inotification';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{
  private readonly notificationService=inject(NotificationService);
  notificationsData: WritableSignal<INotification[] | null> = signal([]);
  nottificationEmpty:boolean=false;

  ngOnInit(): void {
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.notificationService.getAllNotifications().subscribe({
      next: (res: INotification[] | { message: string }) => {
        if (Array.isArray(res)) {
          // ✅ Notifications received
          this.notificationsData.set(res);
          this.nottificationEmpty = res.length === 0;
        } else {
          // 📨 No notifications
          this.nottificationEmpty = true;
          console.log(res.message);
        }
      },
      error: (err) => {
        console.error('Error fetching notifications', err);
      }
    });
  }



  markAsRead(notificationId: number) {
    this.notificationService.markAsRead(notificationId).subscribe(() => {
      const data = this.notificationsData();
      if (data) {
        const n = data.find(n => n.id === notificationId);
        if (n) n.isRead = !n.isRead; // Toggle read/unread
      }
    });
  }
}
