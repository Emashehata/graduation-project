import { Component } from '@angular/core';
import { AppointmentsService } from '../../../core/services/appointments/appointments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointments-student',
  imports: [],
  templateUrl: './appointments-student.component.html',
  styleUrl: './appointments-student.component.css'
})
export class AppointmentsStudentComponent {


constructor(private _AppointmentsService:AppointmentsService ,private toastr:ToastrService)
{}



}
