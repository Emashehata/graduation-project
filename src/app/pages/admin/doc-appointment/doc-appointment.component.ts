import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../core/services/appointments/appointments.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doc-appointment',
  imports: [RouterLink],
  templateUrl: './doc-appointment.component.html',
  styleUrl: './doc-appointment.component.css'
})
export class DocAppointmentComponent implements OnInit {

  appointments: any[] = [];
  showDeleteModal = false;
  appointmentToDelete: string | null = null;


  constructor(private appointmentService: AppointmentsService , private toastrService:ToastrService) {}

  ngOnInit(): void {
    // جلب بيانات المواعيد من خدمة الـ API
    this.appointmentService.Appointments().subscribe((data) => {
      this.appointments = data;
    });
  }

  // دالة لتنسيق الوقت من صيغة 24 ساعة إلى 12 ساعة
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const formattedHour = hour > 12 ? hour - 12 : hour;
    const suffix = hour >= 12 ? 'م' : 'ص';
    return `${formattedHour}:${minutes} ${suffix}`;
  }

  openDeleteModal(id: string) {
    this.appointmentToDelete = id;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.appointmentToDelete) {
      this.appointmentService.DeleteAppointment(this.appointmentToDelete).subscribe({
        next: (response) => {
          if (response.success) {
            this.appointments = this.appointments.filter(appointment => appointment.id !== this.appointmentToDelete);
            this.toastrService.success(response.message);
          } else {
            console.error("فشل في حذف الموعد:", response.message);
          }
          this.closeModal();
        },
        error: (err) => {
          console.error("خطأ أثناء حذف الموعد:", err);
          this.closeModal();
        }
      });
    }
  }

  cancelDelete() {
    this.closeModal();
  }

  closeModal() {
    this.showDeleteModal = false;
    this.appointmentToDelete = null;
  }

}
