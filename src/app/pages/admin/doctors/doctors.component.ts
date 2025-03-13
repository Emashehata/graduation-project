import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../../../core/services/doctor/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { IDoctor } from '../../../core/interfaces/idoctor/idoctor';
import { IClinic } from '../../../core/interfaces/Iclinic/iclinic';
import { ClinicsService } from '../../../core/services/clinics/clinics.service';

@Component({
  selector: 'app-doctors',
  imports: [RouterLink],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {

  private readonly doctorService=inject(DoctorService);
  private readonly toastrService = inject(ToastrService);
  private readonly clinicsService = inject(ClinicsService);

    doctorsData: WritableSignal<IDoctor[]> = signal([]);
    clinicData: WritableSignal<IClinic[]> = signal([]);

  ngOnInit(): void {
    this.getDoctorsData();
    this.getClinicsData();
  }


  getDoctorsData(): void {

    this.doctorService.getAllDoctors().subscribe({
      next: (res) => {
        if (res.success) {
          this.doctorsData.set(res.data);
          console.log(res);

        } else {
          this.toastrService.error('فشل في تحميل بيانات العيادات');
        }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('حدث خطأ أثناء جلب البيانات');
      }
    });
  }

  deleteDoctor(id:string):void{
    this.doctorService.deleteDoctorByID(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.success==true){
          this.getDoctorsData();
          this.toastrService.success('تم حذف الطبيب بنجاح.')

        }

      }
    })
  }


  getClinicsData(): void {

    this.clinicsService.getAllClinics().subscribe({
      next: (res) => {
        if (res.success) {
          this.clinicData.set(res.data);
        } else {
          this.toastrService.error('فشل في تحميل بيانات العيادات');
        }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('حدث خطأ أثناء جلب البيانات');
      },

    });
  }

}
