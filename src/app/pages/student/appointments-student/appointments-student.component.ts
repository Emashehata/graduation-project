import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../core/services/appointments/appointments.service';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../../core/services/Booking/booking.service';
import { DoctorService } from '../../../core/services/doctor/doctor.service';
import { ExaminationService } from '../../../core/services/Examination/examination.service';
import { PatientService } from '../../../core/services/patient/patient.service';

@Component({
  selector: 'app-appointments-student',
  imports: [],
  templateUrl: './appointments-student.component.html',
  styleUrl: './appointments-student.component.css'
})
export class AppointmentsStudentComponent implements OnInit {


constructor(private bookingService:BookingService ,private patientService:PatientService ,private doctorService:DoctorService,private examinationService:ExaminationService,private toastr:ToastrService)
{}

bookings: any[] = [];
selectedBookingId: string | null = null;


// ngOnInit(): void {
//   this.bookingService.patientBookings().subscribe((res: any) => {
//     if (res.success) {
//       const bookings = res.data;
//       // fetch doctor data for each booking
//       bookings.forEach((booking: any) => {
//         this.doctorService.getDoctorByID(booking.doctorId).subscribe((docRes: any) => {
//           if (docRes.success) {
//             booking.doctor = docRes.data;
//           }
//         });
//       });

//       this.bookings = bookings;
//     }
//   });
// }

ngOnInit(): void {
  this.patientService.getPatientByToken().subscribe(patientRes => {
    if (patientRes.success) {
      const patientId = patientRes.data.id;

      // جيبنا السجلات الطبية للمريض
      this.examinationService.Examinationpatient(patientId).subscribe(examRes => {
        const examinations = examRes.success ? examRes.data : [];

        // بعد كده نجيب المواعيد
        this.bookingService.patientBookings().subscribe((res: any) => {
          if (res.success) {
            let bookings = res.data;

            // فلترة المواعيد
            bookings = bookings.filter((booking: any) => {
              const bookingDate = booking.date;
              const bookingDoctorId = booking.doctorId;
              const today = new Date().toISOString().split('T')[0];

              // لو التاريخ عدى => احذفه
              if (bookingDate < today) return false;

              // لو في سجل بنفس التاريخ والدكتور => احذفه
              const hasExam = examinations.some((exam: any) =>
                exam.dateOfVisit === bookingDate && exam.doctorId === bookingDoctorId
              );
              return !hasExam;
            });

            // نجيب بيانات الدكتور
            bookings.forEach((booking: any) => {
              this.doctorService.getDoctorByID(booking.doctorId).subscribe((docRes: any) => {
                if (docRes.success) {
                  booking.doctor = docRes.data;
                }
              });
            });

            this.bookings = bookings;
          }
        });

      });

    }
  });
}


formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

  return isToday ? 'اليوم' : `${days[date.getDay()]}، ${date.getDate()} ${months[date.getMonth()]}`;
}

formatTime(timeStr: string): string {
  const [hourStr, minuteStr] = timeStr.split(':');
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  const period = hour < 12 ? 'صباحًا' : 'مساءً';

  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;

  return `${hour}:${minute} ${period}`;
}

formatDateWithYear(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

  return isToday
    ? 'اليوم'
    : `${days[date.getDay()]}، ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}


deleteConfirmed(): void {
  if (!this.selectedBookingId) return;

  this.bookingService.deleteBooking(this.selectedBookingId).subscribe({
    next: (res) => {
      if (res.success) {
        this.toastr.success(res.message);
        this.bookings = this.bookings.filter(b => b.id !== this.selectedBookingId);
      } else {
        this.toastr.error('حدث خطأ أثناء محاولة إلغاء الميعاد');
      }
      this.selectedBookingId = null;
    },
    error: () => {
      this.toastr.error('حدث خطأ أثناء محاولة إلغاء الميعاد');
      this.selectedBookingId = null;
    }
  });
}


}
