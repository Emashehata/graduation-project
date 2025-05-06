import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClinicsService } from '../../../core/services/clinics/clinics.service';
import { IClinic } from '../../../core/interfaces/Iclinic/iclinic';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-clinic-admin',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './clinic-admin.component.html',
  styleUrl: './clinic-admin.component.css'
})
export class ClinicAdminComponent {

  readonly clinicsService = inject(ClinicsService);
  private readonly formBuilder= inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);

  selectedFiles: { [id: string]: File | null } = {};
  isLoading: boolean = false;
  sucessMsg:boolean=false;

  updateClnicForm!:FormGroup;

  ngOnInit(): void {
    this.clinicsService.getClinicsData();
      this.updateClnicForm = this.formBuilder.group({
                          name:[null],
                          imageFile:[null],
                })
  }


  deleteClinic(id:string):void{
    this.clinicsService.deleteSpecficClinic(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.success==true){
          this.clinicsService.getClinicsData();
          this.toastrService.success('تم حذف العيادة بنجاح')

        }

      }
    })
  }

  onFileSelected(event: Event, id: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles[id] = input.files[0];
    } else {
      this.selectedFiles[id] = null;
    }
  }

  patchValue(clinic:any):void{
    this.updateClnicForm.patchValue(clinic);
  }





  sumbitUpdateClnicForm(id: string): void {
    if (this.updateClnicForm.invalid) {
      this.updateClnicForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = new FormData();

    // Append only non-null values to FormData
    if (this.updateClnicForm.get('name')?.value) {
      formData.append('name', this.updateClnicForm.get('name')?.value);
    }


    if (this.selectedFiles[id]) {
      formData.append('imageFile', this.selectedFiles[id] as File);
    }

    this.clinicsService.updateSpecficClinic(id, formData).pipe(
      finalize(() => (this.isLoading = false))
    ).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastrService.success('تم تعديل بيانات العيادة بنجاح');
          this.clinicsService.getClinicsData();
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.toastrService.error('حدث خطأ أثناء تحديث البيانات');
      },
    });
  }

  clinicOptions: string[] = [
    'الجراحة العامة',
    'الجلدية',
    'النفسية والعصبية',
    'الأسنان',
    'الصحة النفسية',
    'جراحة المخ والأعصاب',
    'جراحة الأوعية الدموية',
    'جراحة القلب والصدر',
    'الباطنة',
    'المتوطنة',
    'القلب',
    'الصدر',
    'العظام',
    'الروماتيزم والتأهيل',
    'الأنف والأذن',
    'الرمد',
    'النسا والتوليد',
    'المسالك',
    'الأورام',
    'التغذية العلاجية',
    'الموجات فوق الصوتية',
    'الطوارئ',
    'مكافحة العدوى'
  ];

}
