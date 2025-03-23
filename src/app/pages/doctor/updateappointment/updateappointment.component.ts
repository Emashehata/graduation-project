import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  this.appointmentId = this.route.snapshot.paramMap.get('id') || '';
  console.log('Appointment ID:', this.appointmentId); 
  this.appointmentForm = this.fb.group({
    days: this.fb.array([]), 
    startTime: [''],
    endTime: [''],
    duration: ['']
  });

  // this.loadAppointmentData();

}

// loadAppointmentData(): void {
//   this._AppointmentsService.AppointmentById(this.appointmentId).subscribe((response: any) => {
//     if (response.success) {
//       const appointment = response.data;

//       this.appointmentForm.patchValue({
//         startTime: appointment.startTime,
//         endTime: appointment.endTime,
//         duration: appointment.duration
//       });

//       const daysArray: FormArray = this.appointmentForm.get('days') as FormArray;
//       daysArray.clear();
//       daysArray.push(this.fb.control(appointment.day)); 
//     } else {
//       this.toastrService.error('حدث خطأ أثناء تحميل البيانات');
//     }
//   });
// }



onDayChange(event: any, dayId: number) {
  const daysArray: FormArray = this.appointmentForm.get('days') as FormArray;
  daysArray.clear(); 

  if (event.target.checked) {
    daysArray.push(this.fb.control(dayId)); 
  }
}


updateAppointment() {
  const formData = this.appointmentForm.value;

  const requestData = {
    day: formData.days[0], 
    startTime: formData.startTime,
    endTime: formData.endTime,
    duration: Number(formData.duration)
  };

  console.log('Request Data:', requestData);

  this._AppointmentsService.UpdateAppointment(this.appointmentId, requestData).subscribe(
    res => {
      console.log('Appointment Updated:', res);
      this.toastrService.success(res.message);
      this.router.navigate(['/appointment']);
    },
    error => {
      console.error('Error:', error);
    }
  );
}





}
