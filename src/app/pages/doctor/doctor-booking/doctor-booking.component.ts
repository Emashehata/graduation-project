import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../core/services/Booking/booking.service';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../../core/environments/environment';
import { AppointmentsService } from '../../../core/services/appointments/appointments.service';
import { DoctorService } from '../../../core/services/doctor/doctor.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-doctor-booking',
  imports: [DatePipe , CommonModule , RouterLinkActive ,RouterLink],
  templateUrl: './doctor-booking.component.html',
  styleUrl: './doctor-booking.component.css'
})
export class DoctorBookingComponent implements OnInit{

constructor(private readonly bookingService:BookingService ,private readonly appointmentsService:AppointmentsService , private readonly doctorService:DoctorService){}

appointmentsByDate: { [key: string]: any[] } = {};
dates: string[] = [];
selectedDate: string = '';
generateNext7Days(): string[] {
  const today = new Date();
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date.toISOString().split('T')[0]); // yyyy-MM-dd
  }
  return days;
}


// ngOnInit() {
  
//   this.bookingService.doctorBookings().subscribe(res => {
//     const bookings = res.data;
//     bookings.forEach((booking: any) => {
//       if (!this.appointmentsByDate[booking.date]) {
//         this.appointmentsByDate[booking.date] = [];
//         this.dates.push(booking.date);
//       }
//       this.appointmentsByDate[booking.date].push(booking);
//     });
//     if (this.dates.length) {
//       this.selectedDate = this.dates[0];
//     }
//   });
// }

// ngOnInit() {
//   this.dates = this.generateNext7Days();

//   this.bookingService.doctorBookings().subscribe(res => {
//     const bookings = res.data;
//     bookings.forEach((booking: any) => {
//       if (!this.appointmentsByDate[booking.date]) {
//         this.appointmentsByDate[booking.date] = [];
//       }
//       this.appointmentsByDate[booking.date].push(booking);
//     });
//     if (this.dates.length) {
//       this.selectedDate = this.dates[0];
//     }
//   });
// }

ngOnInit() {
  this.dates = this.generateNext7Days();

  this.bookingService.doctorBookings().subscribe(res => {
    const bookings = res.data;
    bookings.forEach((booking: any) => {
      if (!this.appointmentsByDate[booking.date]) {
        this.appointmentsByDate[booking.date] = [];
      }
      this.appointmentsByDate[booking.date].push(booking);
    });

    // التأكد من إزالة التواريخ المكررة
    this.dates = Array.from(new Set(this.dates));  // إزالة التكرار

    if (this.dates.length) {
      this.selectedDate = this.dates[0];
    }
  });
}




isValidAppointmentsList(date: string): boolean {
  return Array.isArray(this.appointmentsByDate[date]) && this.appointmentsByDate[date].length > 0;
}
getImageUrl(path: string): string {
  return `${environment.baseUrl}${path}`;
}

convertTo12HourFormat(time: string): string {
  const [hour, minute] = time.split(':');
  let hours = parseInt(hour, 10);
  let ampm = hours >= 12 ? 'م' : 'ص';  // إذا كانت الساعة أكبر من 12 سيكون الوقت مساءً (م)، وإذا كانت أقل سيكون صباحاً (ص)
  
  if (hours > 12) {
    hours -= 12;  // إذا كانت الساعة أكبر من 12 نخصم 12 لجعلها بتنسيق 12 ساعة
  }
  
  if (hours === 0) {
    hours = 12;  // إذا كانت الساعة 0 (منتصف الليل) نعرضها كـ 12
  }

  // تنسيق الوقت ليظهر بشكل 12 ساعة مع "ص" أو "م"
  return `${hours}:${minute} ${ampm}`;
}


}
