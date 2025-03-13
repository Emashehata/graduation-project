import { Component, inject } from '@angular/core';
import { ClinicsService } from '../../../core/services/clinics/clinics.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-add-clinic',
  imports: [ReactiveFormsModule],
  templateUrl: './add-clinic.component.html',
  styleUrl: './add-clinic.component.css'
})
export class AddClinicComponent {
         private readonly clinicsService=inject(ClinicsService);
          private readonly formBuilder= inject(FormBuilder);
          private readonly router= inject(Router);
          private readonly toastrService = inject(ToastrService);


          isLoading:boolean=false;
          selectedFile: File | null = null;

          clinicForm!:FormGroup

          ngOnInit(): void {
            this.clinicForm =this.formBuilder.group({
              name:[null,[Validators.required]],
              imageFile:[null, [Validators.required]],
            })
          }

      onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          this.selectedFile = input.files[0];
        }
      }





          sumbitForm(): void {
            if (this.clinicForm.valid && this.selectedFile) {
              this.isLoading = true;

              // Convert Form Values to FormData
              const formData = new FormData();

              formData.append('name', this.clinicForm.get('name')?.value);
              formData.append('imageFile', this.selectedFile); // Append file

              this.clinicsService.addClinic(formData).pipe(
                      finalize(() => this.isLoading = false)
                    ).subscribe({
                next: (res) => {
                  console.log(res);
                  if(res.success==true){
                    setTimeout(() => {
                      this.toastrService.success('تم إضافة العيادة بنجاح')
                      this.router.navigate(['./clinic-admin'])
                    }, 800);
                    this.isLoading = false;
                  }
                },
                error: (err: HttpErrorResponse) => {
                  console.log(err);
                  this.isLoading = false;
                }
              });
            } else {
              this.clinicForm.markAllAsTouched();
            }
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
