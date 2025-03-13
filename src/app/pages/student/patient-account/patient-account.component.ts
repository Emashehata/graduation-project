import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { PatientService } from '../../../core/services/patient/patient.service';
import { IPatient } from '../../../core/interfaces/IPatient/ipatient';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient-account',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './patient-account.component.html',
  styleUrl: './patient-account.component.css'
})
export class PatientAccountComponent {
      private readonly patientService=inject(PatientService);
      private readonly formBuilder= inject(FormBuilder);
      private readonly toastrService = inject(ToastrService);
      patientData: WritableSignal<IPatient | null> = signal(null);
      selectedFile: File | null = null;
      isLoading: boolean = false;

      updatePatientForm!:FormGroup;

      ngOnInit(): void {
        this.getPatientAccount();
        this.updatePatientForm =this.formBuilder.group({
          FirstName:[''],
          LastName:[''],
          College:[''],
          NationalID:[''],
          PhoneNumber: [''], // Accept empty strings instead of null
          ImageFile: [null],  // Accept files (optional)
          Email: [''],


  })
      }


      onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          this.selectedFile = input.files[0];
        }
      }

      patchValue(patient: IPatient | null): void {
        if (!patient) {
          console.error("Doctor data is null");
          return;
        }

        this.updatePatientForm.patchValue({
          PhoneNumber: patient.phoneNumber || '',
          FirstName: patient.firstName || '',
          LastName: patient.lastName || '',
          College: patient.college || '',
          NationalID: patient.nationalID || '',
          Email: patient.email || '',

        });
      }


      sumbitUpdatePatientForm(): void {
        this.isLoading = true;
        const formData = new FormData();

        const formValues = this.updatePatientForm.value;

        // Append all fields, ensuring empty values are handled correctly
        Object.keys(formValues).forEach((key) => {
          const value = formValues[key];

          // Convert null or empty strings to an empty string to avoid issues
          formData.append(key, value !== null ? value : '');
        });

        // Append selected file if exists
        if (this.selectedFile) {
          formData.append('ImageFile', this.selectedFile);
        }

        this.patientService.updatePatientUsingToken(formData).pipe(
          finalize(() => (this.isLoading = false))
        ).subscribe({
          next: (res) => {
            console.log(res);

            this.toastrService.success('تم تعديل بياناتك بنجاح');
            this.getPatientAccount();
            // this.PatientService.savePatientData(res.data);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.toastrService.error('حدث خطأ أثناء تحديث البيانات');
          },
        });
      }




      getPatientAccount():void{
        this.patientService.getPatientByToken().subscribe({
            next:(res)=>{
              if (res.success) {
                this.patientData.set(res.data);
                this.patchValue(res.data);
                console.log(res.data);
                this.patientService.patientImg.next(res.data.imageUrl);
                this.patientService.patientFirstName.next(res.data.firstName);
                this.patientService.patientLastName.next(res.data.lastName);

              }

            }
        })
      }

      colleges: string[] = [
        "كلية الزراعة", "كلية الهندسة", "كلية التربية", "كلية الطب", "كلية الآداب", "كلية التربية الرياضية",
        "كلية التربية النوعية", "كلية التجارة", "كلية العلوم", "كلية الصيدلة", "كلية الحقوق", "كلية طب الأسنان",
        "كلية التمريض", "المعهد الفني للتمريض", "كلية الحاسبات والمعلومات", "كلية الفنون التطبيقية"
      ];
}
