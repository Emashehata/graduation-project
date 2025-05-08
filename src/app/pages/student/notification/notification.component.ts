import { Component, OnInit, inject } from '@angular/core';
import { WritableSignal, signal } from '@angular/core';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { INotification } from '../../../core/interfaces/INotification/inotification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  private readonly notificationService = inject(NotificationService);

  // Shared reactive notifications signal
  notificationsData = this.notificationService.notifications;

  // Boolean flag for empty state
  nottificationEmpty = false;

  ngOnInit(): void {
    this.notificationService.getAllNotifications().subscribe({
      next: (res) => {
        this.notificationService.notifications.set(res);
        // If no notifications were returned, update empty flag
        this.nottificationEmpty = !res || res.length === 0;
      },
      error: (err) => {
        console.error('Error fetching notifications', err);
        this.nottificationEmpty = true;
      }
    });
  }

  markAsRead(notificationId: number): void {
    this.notificationService.markAsRead(notificationId).subscribe(() => {
      this.notificationService.updateLocalReadStatus(notificationId);
    });
  }
}
