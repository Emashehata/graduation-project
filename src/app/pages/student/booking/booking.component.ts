import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from '../../../core/services/appointments/appointments.service';
import { error } from 'console';
import { DoctorService } from '../../../core/services/doctor/doctor.service';
import { BookingService } from '../../../core/services/Booking/booking.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-booking',
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent  implements OnInit{
      private readonly toastrService=inject(ToastrService);
private readonly router = inject(Router);

      bookingConfirmed = false; // متغير للتحكم في عرض الكارد



  
  doctorSchedule: any[] = [];
  doctor: any = {};

  doctorImage: string = '';


  selectedDay: any = null;  // اليوم المختار
  isLoading: boolean = true; // متغير لتحميل البيانات
  selectedSlot: string | null = null; // الموعد المختار
  bookedSlots: Set<string> = new Set(); // قائمة بالأوقات المحجوزة
  selectedBooking: any = {};



  constructor(private route:ActivatedRoute ,private _BookingService:BookingService, private _AppointmentsService:AppointmentsService ,private _DoctorService:DoctorService){}

  ngOnInit(): void {


    this.route.paramMap.subscribe(params => {
    const doctorId = params.get('id'); // تأكد أن اسم المتغير يطابق `:id` في `routing`
    if (doctorId) {
      this.getDoctorInfo(doctorId);
      this.getDoctorSchedule(doctorId);
    } else {
      console.error('Doctor ID is missing from the route.');
    }
  });

  }


  getDoctorInfo(doctorId: string): void {
    console.log('Doctor ID:', doctorId); // تأكد من أن الـ ID صحيح
  
    this._DoctorService.getDoctorByID(doctorId).subscribe(
      res => {
       
          this.doctor = res.data;
          console.log('Doctor Data:', this.doctor);
          if (this.doctor.imageUrl) {
            this.doctorImage = `https://myclinicapp.runasp.net${this.doctor.imageUrl}`;
          } else {
            this.doctorImage = 'assets/default-doctor.jpg'; // صورة افتراضية لو مش موجودة
          }
      },
      err => {
        console.error('HTTP Error:', err);
      });
    
  }
  
  getDoctorSchedule(doctorId: string): void{
    this._AppointmentsService.availableSlotsForDoctor(doctorId).subscribe(
      res=>{
        console.log(res);
        this.doctorSchedule = res.data;
        this.isLoading = false; // تم تحميل البيانات بنجاح

         // تعيين اليوم الافتراضي كأول يوم يحتوي على مواعيد متاحة
         const firstAvailableDay = this.doctorSchedule.find(day => day.availableSlots.length > 0);
         this.selectedDay = firstAvailableDay || null;

      },
      err=>{
        console.log(err);
        this.isLoading = false;

      }
    );
  }

  // selectDay(slot: any) {
  //   if (slot.availableSlots.length > 0) {
  //     this.selectedDay = slot;
  //     this.selectedSlot = null; // إعادة تعيين الوقت عند تغيير اليوم
  //   }
  // }

  selectDay(slot: any) {
    const currentDate = new Date(); // التاريخ الحالي
    const selectedDate = new Date(slot.date); // التاريخ الذي اختاره المستخدم
  
    // إذا كان اليوم الذي اختاره هو اليوم الحالي
    if (selectedDate.toDateString() === currentDate.toDateString()) {
      this.toastrService.warning('لا يمكنك الحجز في نفس اليوم. يجب أن يكون الحجز قبل 24 ساعة  .');
    } else {
      // إذا كان اليوم غير اليوم الحالي، نحدد اليوم المختار
      this.selectedDay = slot;
      this.selectedSlot = null; // إعادة تعيين الوقت المختار
    }
  }
  
  
  // دالة للتحقق إذا كان التاريخ يبعد عن التاريخ الحالي 24 ساعة أو أكثر
isMoreThan24HoursAway(dateString: string): boolean {
  const today = new Date();
  const selectedDate = new Date(dateString);

  // نحسب الفرق بين التاريخين بالميلي ثانية
  const diffInMs = selectedDate.getTime() - today.getTime();
  
  // إذا كانت المدة أكبر من أو تساوي 24 ساعة (86400000 مللي ثانية)
  return diffInMs >= 86400000;
}


  
  // selectTime(time: string) {
  //   if (!this.bookedSlots.has(time)) {
  //     this.selectedSlot = time;
  //   }
  // }

  selectTime(time: string) {
    if (!this.bookedSlots.has(time)) {
      const selectedDateTime = new Date(this.selectedDay.date + ' ' + time);
      const now = new Date();
      
      // التأكد أن الوقت يبعد 24 ساعة على الأقل
      if (selectedDateTime.getTime() - now.getTime() < 86400000) {
        this.toastrService.error(' لا يمكنك الحجز في نفس اليوم. يجب أن يكون الحجز قبل 24 ساعة - اختر يوم اخر .');
        return;
      }
  
      this.selectedSlot = time;
    }
  }
  

  selectSlot() {
    if (this.selectedDay && this.selectedSlot) {
      this.selectedBooking = {
        date: this.selectedDay.date, // تأكد من تمرير التاريخ الصحيح
        time: this.selectedSlot,
        doctorId: this.doctor.id
      };
      this.openConfirmModal();
    }
  }
 

  openConfirmModal() {
    let modal = new bootstrap.Modal(document.getElementById('confirmBookingModal'));
    modal.show();
  }

//   confirmBooking() {
//     if (!this.selectedBooking.date || !this.selectedBooking.time) {
//       return;
//     }
 
//     this._BookingService.createBooking(this.selectedBooking).subscribe(
//       res => {
//         // إضافة الموعد المحجوز لمنعه لاحقًا
//         const bookedTime = `${this.selectedBooking.date}-${this.selectedBooking.time}`;
//         this.bookedSlots.add(bookedTime);
 
 
//         // إغلاق الـ Modal بعد الحجز
//         let modal = bootstrap.Modal.getInstance(document.getElementById('confirmBookingModal'));
//         modal.hide();
//         this.bookingConfirmed = true; // عند الضغط، يظهر الكارد
       
//         this.toastrService.success(res.message);
//         // this.router.navigate(['/appointment-student']);
//         setTimeout(() => {
//           this.bookingConfirmed = false;
//           this.router.navigate(['/appointment-student']);

//         }, 3000);

//       },
//       err=>{
//         this.toastrService.error(err.message);
//       }
//     );
//  }
 
  

  // bookAppointment() {
  //   if (this.selectedSlot) {
  //     this.bookedSlots.add(this.selectedSlot); // إضافة الوقت المحجوز إلى القائمة
  //     this.selectedSlot = null; // إعادة تعيين الاختيار بعد الحجز
  //   }
  // }  



   // تحديد الموعد
 
 


   // التحقق مما إذا كان الوقت محجوزًا

   confirmBooking() {
    if (!this.selectedBooking.date || !this.selectedBooking.time) {
      this.toastrService.error('يجب تحديد التاريخ والوقت');
      return;
    }
  
    this._BookingService.createBooking(this.selectedBooking).subscribe(
      res => {
        const bookedTime = `${this.selectedBooking.date}-${this.selectedBooking.time}`;
        this.bookedSlots.add(bookedTime);
  
        let modal = bootstrap.Modal.getInstance(document.getElementById('confirmBookingModal'));
        modal.hide();
        this.bookingConfirmed = true;
        this.toastrService.success(res.message);
  
        setTimeout(() => {
          this.bookingConfirmed = false;
          this.router.navigate(['/appointment-student']);
        }, 3000);
      },
      err => {
        this.toastrService.error(err.message);
  
        // إغلاق الـ Modal في حالة حدوث خطأ
        let modal = bootstrap.Modal.getInstance(document.getElementById('confirmBookingModal'));
        modal.hide();
      }
    );
  }
  

   formatDateToDayName(dateString: string): string {
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  
    const date = new Date(dateString);
    const today = new Date();
  
    // إذا كان اليوم هو اليوم الحالي، نعرض "اليوم"
    if (date.toDateString() === today.toDateString()) {
      return 'اليوم';
    }
  
    return days[date.getDay()]; // إرجاع اسم اليوم
  }
  
  formatDateToArabic(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' }); 
  }
  

  formatTimeToArabic(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
  
    // الحصول على الوقت بالأرقام الإنجليزية
    const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  
    // استبدال AM و PM بـ صباحًا و مساءً
    return timeString.replace('AM', 'صباحًا').replace('PM', 'مساءً');
  }
  

}
