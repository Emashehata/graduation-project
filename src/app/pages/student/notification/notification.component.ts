 import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { INotification } from '../../../core/interfaces/INotification/inotification';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  private readonly notificationService = inject(NotificationService);
  notificationsData: WritableSignal<INotification[] | null> = signal([]);
  nottificationEmpty: boolean = false;
  selectedNotification: INotification | null = null;

  ngOnInit(): void {
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.notificationService.getAllNotifications().subscribe({
      next: (res: INotification[] | { message: string }) => {
        if (Array.isArray(res)) {
          this.notificationsData.set(res);
          this.nottificationEmpty = res.length === 0;
        } else {
          this.nottificationEmpty = true;
          console.log(res.message);
        }
      },
      error: (err) => {
        console.error('Error fetching notifications', err);
      }
    });
  }

  onNotificationClick(notification: INotification) {
    if (!notification.isRead) {
      this.markAsRead(notification.id);
    }
    this.getSpecficNotification(notification.id.toString());
  }

  getSpecficNotification(id: string) {
    this.notificationService.getSpecficNotifications(id).subscribe({
      next: (res: INotification) => {
        this.selectedNotification = res;
      },
      error: (err) => {
        console.error('Error fetching specific notification:', err);
      }
    });
  }

  markAsRead(notificationId: number) {
    this.notificationService.markAsRead(notificationId).subscribe({
      next: (response) => {
        this.notificationService.countUnRead.next(response);

        const current = this.notificationsData();
        if (current) {
          const index = current.findIndex(n => n.id === notificationId);
          if (index !== -1 && !current[index].isRead) {
            const updated = [...current];
            updated[index] = { ...updated[index], isRead: true };
            this.notificationsData.set(updated);
          }
        }
      },
      error: (error) => {
        console.error('Error marking notification as read:', error);
      }
    });
  }
}
