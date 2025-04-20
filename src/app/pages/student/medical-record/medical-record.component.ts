  import { Component, OnInit } from '@angular/core';
  import { ExaminationService } from '../../../core/services/Examination/examination.service';
  import { PatientService } from '../../../core/services/patient/patient.service';
  import { FormsModule } from '@angular/forms';
  import { DatePipe } from '@angular/common';
  import { BookingService } from '../../../core/services/Booking/booking.service';
  import { Observable } from 'rxjs';

  @Component({
    selector: 'app-medical-record',
    imports: [FormsModule ,DatePipe],
    templateUrl: './medical-record.component.html',
    styleUrl: './medical-record.component.css'
  })
  export class MedicalRecordComponent implements OnInit {

    patientId: string = '';
    examinationList: any[] = [];
    selectedMonth: string = '';
    availableMonths: string[] = [];
    bookings: any[] = [];

    constructor(private examinationService: ExaminationService , private patientService:PatientService ,private bookingService:BookingService) {}

    ngOnInit() {

      this.bookingService.patientBookings().subscribe(res => {
        if (res.success) {
          this.bookings = res.data; 
          console.log(   res.data )
        }
      });

      // جلب بيانات المريض
      this.patientService.getPatientByToken().subscribe(res => {
        if (res.success) {
          this.patientId = res.data.id; 
          this.getExaminations(this.patientId);
        }
      });
    }



    
    // getExaminations(patientId: string) {
    //   this.examinationService.Examinationpatient(patientId).subscribe(res => {
    //     if (res.success) {
    //       this.examinationList = res.data;

    //       const monthsSet = new Set(this.examinationList.map(e => e.dateOfVisit.slice(0, 7)));
    //       this.availableMonths = Array.from(monthsSet).sort().reverse();
    //       this.selectedMonth = this.availableMonths[0]; 
    //     }
    //   });
    // }

    getExaminations(patientId: string) {
      this.examinationService.Examinationpatient(patientId).subscribe(res => {
        if (res.success && res.data.length > 0) {
          this.examinationList = res.data;
    
          const monthsSet = new Set(this.examinationList.map(e => e.dateOfVisit.slice(0, 7)));
          this.availableMonths = Array.from(monthsSet).sort().reverse();
          this.selectedMonth = this.availableMonths[0]; 
        } else {
          this.examinationList = [];
          this.availableMonths = [];
          this.selectedMonth = '';
        }
      });
    }
    


    
    get filteredExaminations() {
      return this.examinationList.filter(exam => {
        const month = exam.dateOfVisit?.slice(0, 7); // 'yyyy-MM'
        return month === this.selectedMonth;
      });
    }

    formatMonthLabel(month: string): string {
      const date = new Date(month + '-01');
      return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long' });
    }

    getBookingTime(dateOfVisit: string): string {
      const booking = this.bookings.find(b => b.date === dateOfVisit);
    
      if (booking && booking.time) {
        const timeParts = booking.time.split(':');
        let hour = parseInt(timeParts[0], 10);
        let minute = timeParts[1];
        let period = hour >= 12 ? 'مساءً' : 'صباحًا';
    
        hour = hour % 12 || 12;
    
        // التحقق من وجود حجوزات أخرى بنفس الوقت
        const similarBookings = this.bookings.filter(b => b.date === dateOfVisit && b.time === booking.time);
        
        if (similarBookings.length > 1) {
          return `${hour}:${minute} ${period} (متعدد الحجز)`;
        }
    
        return `${hour}:${minute} ${period}`;
      }
    
      return 'غير متوفر'; // أو أي نص تود إظهاره عند عدم العثور على وقت
    }
    
    
    
    

  }
