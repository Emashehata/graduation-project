import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentsService } from '../../../core/services/appointments/appointments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateappointment',
  imports: [FormsModule , ReactiveFormsModule],
  templateUrl: './updateappointment.component.html',
  styleUrl: './updateappointment.component.css'
})
export class UpdateappointmentComponent implements OnInit {

constructor(private fb:FormBuilder , private _AppointmentsService:AppointmentsService , private route: ActivatedRoute){}


private readonly router = inject(Router);
private readonly toastrService = inject(ToastrService);

daysList = [
  { id: 6, name: 'السبت' },
  { id: 0, name: 'الأحد' },
  { id: 1, name: 'الإثنين' },
  { id: 2, name: 'الثلاثاء' },
  { id: 3, name: 'الأربعاء' },
  { id: 4, name: 'الخميس' },
  { id: 5, name: 'الجمعة' }
];

appointmentForm!: FormGroup;
appointmentId!: string;



ngOnInit(): void {
 this.appointmentForm = this.fb.group(
      {
        days: this.fb.array([], Validators.required), 
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        duration: ['', [Validators.required , Validators.min(1)]]

      },
      {
        validators: this.timeValidator
      }
    );

  this.route.paramMap.subscribe(params => {
    this.appointmentId = params.get('id') || '';


    if (this.appointmentId) {
      this.loadAppointmentData();
    }
  });
}

timeValidator(formGroup: FormGroup) {
  const start = formGroup.get('startTime')?.value;
  const end = formGroup.get('endTime')?.value;

  if (start && end && start >= end) {
    return { invalidTime: true };
  }
  return null;
}


loadAppointmentData(): void {
  this._AppointmentsService.AppointmentById(this.appointmentId).subscribe((response: any) => {

    if (response) { 
      const appointment = response; 

      this.appointmentForm.patchValue({
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        duration: appointment.duration
      });


      const daysArray: FormArray = this.appointmentForm.get('days') as FormArray;
      daysArray.clear();
      daysArray.push(this.fb.control(appointment.day)); 

      this.toastrService.success('تم تحميل البيانات بنجاح');

    } else {
      this.toastrService.error('حدث خطأ أثناء تحميل البيانات');
    }
  }, error => {
    console.error('Error fetching appointment:', error);
    this.toastrService.error('فشل في جلب بيانات الموعد');
  });
}


onDayChange(event: any, dayId: number) {
  const daysArray: FormArray = this.appointmentForm.get('days') as FormArray;
  daysArray.clear(); 

  if (event.target.checked) {
    daysArray.push(this.fb.control(dayId)); 
  }
  
  daysArray.updateValueAndValidity(); 
}


// updateAppointment() {
//   const formData = this.appointmentForm.value;

//   const requestData = {
//     day: formData.days[0], 
//     startTime: formData.startTime,
//     endTime: formData.endTime,
//     duration: Number(formData.duration)
//   };

  

//   console.log('Request Data:', requestData);

//   this._AppointmentsService.UpdateAppointment(this.appointmentId, requestData).subscribe(
//     res => {
//       console.log('Appointment Updated:', res);
//       this.toastrService.success(res.message);
//       this.router.navigate(['/appointment']);
//     },
//     error => {
//       console.error('Error:', error);
//     }
//   );
// }

updateAppointment() {
  if (this.appointmentForm.invalid) {
    this.appointmentForm.markAllAsTouched(); // ✅ ده بيظهر كل الرسائل لو الفورم فيه أخطاء
    return;
  }

  const formData = this.appointmentForm.value;

  const requestData = {
    day: formData.days[0], 
    startTime: formData.startTime,
    endTime: formData.endTime,
    duration: Number(formData.duration)
  };

  this._AppointmentsService.UpdateAppointment(this.appointmentId, requestData).subscribe(
    res => {
      this.toastrService.success(res.message);
      this.router.navigate(['/appointment']);
    },
    error => {
      console.error('Error:', error);
    }
  );
}




}
