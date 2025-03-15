import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../../core/services/doctor/doctor.service';
import { IDoctor } from '../../../core/interfaces/idoctor/idoctor';

@Component({
  selector: 'app-clnics-dotors',
  imports: [RouterLink],
  templateUrl: './clnics-dotors.component.html',
  styleUrl: './clnics-dotors.component.css'
})
export class ClnicsDotorsComponent implements OnInit{

  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly doctorService=inject(DoctorService);
  private readonly toastrService=inject(ToastrService);
  doctorData: WritableSignal<IDoctor[]> = signal([]);

  ngOnInit(): void {


    this.activatedRoute.paramMap.subscribe({
      next:(params)=>{
        let clinicID =params.get('id');
        this.doctorService.getDoctorByClinicID(clinicID!).subscribe({
          next:(res)=>{
            if(res.success==true){
              console.log(res);
              this.doctorData.set(res.data)
            }
            else{
              this.toastrService.error(res.message)
            }

          }
        })
      }
    })
  }


}
