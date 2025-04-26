import { Component, inject, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../core/services/appointments/appointments.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-appointment',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.css'
})
export class CreateAppointmentComponent implements OnInit {

  constructor(private fb:FormBuilder ,private _AppointmentsService:AppointmentsService){}

  private readonly router=inject(Router);
  private readonly toastrService=inject(ToastrService);

  daysList = [
    { id: 6, name: 'السبت' },
    { id: 0, name: 'الأحد' },
    { id: 1, name: 'الإثنين' },
    { id: 2, name: 'الثلاثاء' },
    { id: 3, name: 'الأربعاء' },
    { id: 4, name: 'الخميس' },
    { id: 5, name: 'الجمعة' }
  ];

  appointmentForm!:FormGroup;

  // ngOnInit(): void {
  //   this.appointmentForm = this.fb.group({
  //     days: this.fb.array([]), // مصفوفة للأيام
  //     startTime: [''],
  //     endTime: [''],
  //     duration: ['']
  //   });
  // }

  
  // onDayChange(event: any, dayId: number) {
  //   const daysArray: FormArray = this.appointmentForm.get('days') as FormArray;
    
  //   if (event.target.checked) {
  //     daysArray.push(this.fb.control(dayId)); // إضافة اليوم عند التحديد
  //   } else {
  //     let index = daysArray.controls.findIndex(x => x.value === dayId);
  //     daysArray.removeAt(index); // إزالة اليوم عند إلغاء التحديد
  //   }
  // }

  ngOnInit(): void {
    this.appointmentForm = this.fb.group(
      {
        days: this.fb.array([], Validators.required), 
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        duration: ['', Validators.required]

      },
      {
        validators: this.timeValidator
      }
    );
  }
  timeValidator(formGroup: FormGroup) {
    const start = formGroup.get('startTime')?.value;
    const end = formGroup.get('endTime')?.value;
  
    if (start && end && start >= end) {
      return { invalidTime: true };
    }
    return null;
  }
  

  // onDayChange(event: any, dayId: number) {
  //   const daysArray: FormArray = this.appointmentForm.get('days') as FormArray;

  //   if (event.target.checked) {
  //     daysArray.push(this.fb.control(dayId)); // إضافة اليوم عند التحديد
  //   } else {
  //     const index = daysArray.controls.findIndex(x => x.value === dayId);
  //     daysArray.removeAt(index); // إزالة اليوم عند إلغاء التحديد
  //   }
  // }
  

  onDayChange(event: any, dayId: number) {
    const daysArray: FormArray = this.appointmentForm.get('days') as FormArray;
  
    if (event.target.checked) {
      // إذا تم تحديد اليوم، نقوم بإزالة أي اختيارات سابقة وإضافة اليوم المحدد فقط
      daysArray.clear(); // مسح أي أيام تم تحديدها من قبل
      daysArray.push(this.fb.control(dayId)); // إضافة اليوم الجديد
    } else {
      // إذا تم إلغاء التحديد، نزيل اليوم من FormArray
      const index = daysArray.controls.findIndex(x => x.value === dayId);
      if (index > -1) {
        daysArray.removeAt(index); // إزالة اليوم عند إلغاء التحديد
      }
    }
  }
    // submitForm() {
  //   const formData = this.appointmentForm.value;

  //   // التأكد من تحويل الوقت إلى الصيغة المطلوبة
  //   const requestData = {
  //     day: formData.days[0], // لو تم اختيار أكثر من يوم، أرسل اليوم الأول فقط (حسب متطلبات الـ API)
  //     startTime: formData.startTime,
  //     endTime: formData.endTime,
  //     duration: Number(formData.duration)
  //   };


  //   console.log('Request Data:', requestData);

  //   this._AppointmentsService.CreateAppointment(requestData).subscribe(
  //     res=>{
  //       console.log('Appointment Created:', res);
  //       this.toastrService.success(res.message);
  //       this.router.navigate(['/appointment']);

  //     },
  //     error=>{
  //       console.error('Error:', error);
  //       this.toastrService.error('يرجي ادخال البيانات كاملة صحيحة');
  //     }

  //   );

  // }


  // submitForm() {
  //   if (this.appointmentForm.invalid) {
  //     this.appointmentForm.markAllAsTouched(); // عشان تظهر رسائل الخطأ على كل الحقول
  //     return; // يمنع إرسال البيانات
  //   }
  
  //   const formData = this.appointmentForm.value;
  
  //   // التأكد من تحويل الوقت إلى الصيغة المطلوبة
  //   const requestData = {
  //     day: formData.days[0], // لو تم اختيار أكثر من يوم، أرسل اليوم الأول فقط (حسب متطلبات الـ API)
  //     startTime: formData.startTime,
  //     endTime: formData.endTime,
  //     duration: Number(formData.duration)
  //   };
  
  //   console.log('Request Data:', requestData);
  
  //   this._AppointmentsService.CreateAppointment(requestData).subscribe(
  //     res => {
  //       console.log('Appointment Created:', res);
  //       this.toastrService.success(res.message);
  //       this.router.navigate(['/appointment']);
  //     },
  //     error => {
  //       console.error('Error:', error);
  //       this.toastrService.error('يرجي ادخال البيانات كاملة صحيحة');
  //     }
  //   );
  // }
  

  submitForm() {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched(); // عشان تظهر رسائل الخطأ على كل الحقول
      return; // يمنع إرسال البيانات
    }

    const formData = this.appointmentForm.value;

    // التأكد من تحويل الوقت إلى الصيغة المطلوبة
    const requestData = {
      day: formData.days[0], // لو تم اختيار أكثر من يوم، أرسل اليوم الأول فقط (حسب متطلبات الـ API)
      startTime: formData.startTime,
      endTime: formData.endTime,
      duration: Number(formData.duration)
    };

    console.log('Request Data:', requestData);

    this._AppointmentsService.CreateAppointment(requestData).subscribe(
      res => {
        console.log('Appointment Created:', res);
        this.toastrService.success(res.message);
        this.router.navigate(['/appointment']);
      },
      error => {
        console.error('Error:', error);
        this.toastrService.error('يرجى إدخال البيانات بشكل صحيح');
      }
    );
  }


}
