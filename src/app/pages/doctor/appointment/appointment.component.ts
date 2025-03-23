import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppointmentsService } from '../../../core/services/appointments/appointments.service';
import { NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment',
  imports: [RouterLink],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit {

    private readonly toastrService=inject(ToastrService);
  
  constructor(private _AppointmentsService:AppointmentsService){}

  appointments: any[] = [];
  showDeleteModal = false;
  appointmentToDelete: string | null = null;
  

  ngOnInit(): void {

    // this._AppointmentsService.DoctorAppointments().subscribe(data => {
    //   this.appointments = data.map((appointment: any) => ({
    //     ...appointment,
    //     dayName: this.getDayName(appointment.day) // تحويل اليوم من رقم إلى اسم
    //   }));
      
    // });

    this._AppointmentsService.DoctorAppointments().subscribe((response: any) => {
      console.log('API Response:', response.data);
      if (Array.isArray(response.data)) { // تأكد أن response.data مصفوفة
        this.appointments = response.data.map((appointment: any) => ({
          ...appointment,
          dayName: this.getDayName(appointment.day)
        }));
      } else {
        console.error('API returned non-array data:', response.data);
        this.appointments = [];
      }
    });
    
  }

  getDayName(dayNumber: number): string {
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return days[dayNumber ]; // لأن اليوم يبدأ من 1 في الـ API
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'م' : 'ص';
    const formattedHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  // deleteAppointment(id: string) {
  //   if (confirm("هل أنت متأكد أنك تريد إلغاء الموعد؟")) {
  //     this._AppointmentsService.DeleteAppointment(id).subscribe({
  //       next: () => {
  //         // تحديث القائمة بعد الحذف
  //         this.appointments = this.appointments.filter(appointment => appointment.id !== id);
  //       },
  //       error: (err) => {
  //         console.error("خطأ أثناء حذف الموعد:", err);
  //       }
  //     });
  //   }
  // }
  
  openDeleteModal(id: string) {
    this.appointmentToDelete = id;
    this.showDeleteModal = true;
  }
  
  // عند تأكيد الحذف
  confirmDelete() {
    if (this.appointmentToDelete) {
      this._AppointmentsService.DeleteAppointment(this.appointmentToDelete).subscribe({
        next: (response) => {
          if (response.success) {
            // تحديث القائمة بعد الحذف
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
  
  // إغلاق النافذة بدون حذف
  cancelDelete() {
    this.closeModal();
  }
  
  // إغلاق النافذة
  closeModal() {
    this.showDeleteModal = false;
    this.appointmentToDelete = null;
  }



}
