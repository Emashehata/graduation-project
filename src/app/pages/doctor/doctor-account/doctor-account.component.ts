import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IDoctor } from '../../../core/interfaces/idoctor/idoctor';
import { AuthService } from '../../../core/services/auth/auth.service';
import { DoctorService } from '../../../core/services/doctor/doctor.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { IClinic } from '../../../core/interfaces/Iclinic/iclinic';
import { ClinicsService } from '../../../core/services/clinics/clinics.service';

@Component({
  selector: 'app-doctor-account',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './doctor-account.component.html',
  styleUrl: './doctor-account.component.css'
})
export class DoctorAccountComponent {
    readonly authService=inject(AuthService);
    private readonly doctorService=inject(DoctorService);
    private readonly formBuilder= inject(FormBuilder);
    private readonly toastrService = inject(ToastrService);
    private readonly clinicsService = inject(ClinicsService);
    doctorData: WritableSignal<IDoctor | null> = signal(null);
    clinicData: WritableSignal<IClinic[]> = signal([]);
    selectedFile: File | null = null;
    isLoading: boolean = false;

     updateDoctorForm!:FormGroup;

    ngOnInit(): void {
      this.getDoctorsAccount();
      this.getClinicsData();
      this.updateDoctorForm =this.formBuilder.group({
        FirstName:[''],
        LastName:[''],
        College:[''],
        NationalID:[''],
        PhoneNumber: [''], // Accept empty strings instead of null
        ImageFile: [null],  // Accept files (optional)
        Specialty: [''],    // Accept empty stEmail: [''],  // Accept empty strings
        ClinicId: [''],
        Email: [''],
        Description: [''],

})
    }


    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
      }
    }

    patchValue(doctor: IDoctor | null): void {
      if (!doctor) {
        console.error("Doctor data is null");
        return;
      }

      this.updateDoctorForm.patchValue({
        PhoneNumber: doctor.phoneNumber || '',
        FirstName: doctor.firstName || '',
        LastName: doctor.lastName || '',
        College: doctor.college || '',
        NationalID: doctor.nationalID || '',
        Specialty: doctor.specialty || '',
        Description: doctor.description || '',
        ClinicId: doctor.clinicId || null,
        Email: doctor.email || '',

      });
    }


    sumbitUpdateDoctorForm(): void {
      this.isLoading = true;
      const formData = new FormData();

      const formValues = this.updateDoctorForm.value;

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

      this.doctorService.updateDoctorUsingToken(formData).pipe(
        finalize(() => (this.isLoading = false))
      ).subscribe({
        next: (res) => {
          console.log(res);

          this.toastrService.success('تم تعديل بياناتك بنجاح');
          this.getDoctorsAccount(); // Refresh doctor data immediately

        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.toastrService.error('حدث خطأ أثناء تحديث البيانات');
        },
      });
    }




      getClinicsData(): void {
        this.isLoading = true;
        this.clinicsService.getAllClinics().subscribe({
          next: (res) => {
            if (res.success) {
              this.clinicData.set(res.data);
              console.log(this.clinicData());

            } else {
              this.toastrService.error('فشل في تحميل بيانات العيادات');
            }
          },
          error: (err) => {
            console.error(err);
            this.toastrService.error('حدث خطأ أثناء جلب البيانات');
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      }

    getDoctorsAccount():void{
      this.doctorService.getDoctorByID(this.authService.userId()!).subscribe({
          next:(res)=>{
            if (res.success) {
              this.doctorData.set(res.data);
              this.patchValue(res.data);
              console.log(res.data);
              this.doctorService.doctorImg.next(res.data.imageUrl);
              this.doctorService.firstName.next(res.data.firstName);
              this.doctorService.lastName.next(res.data.lastName);

            }

          }
      })
    }
    colleges: string[] = [
      "جامعة القاهرة",
      "جامعة عين شمس",
      "جامعة الإسكندرية",
      "جامعة حلوان",
      "جامعة طنطا",
      "جامعة المنصورة",
      "جامعة الزقازيق",
      "جامعة أسيوط",
      "جامعة المنيا",
      "جامعة بني سويف",
      "جامعة الفيوم",
      "جامعة سوهاج",
      "جامعة جنوب الوادي",
      "جامعة كفر الشيخ",
      "جامعة بنها",
      "جامعة دمنهور",
      "جامعة الوادي الجديد",
      "جامعة بورسعيد",
      "جامعة السويس",
      "جامعة قناة السويس",
      "جامعة مطروح",
      "جامعة دمياط",
      "جامعة أسوان",
      "جامعة العريش",
      "جامعة مدينة السادات",
      "جامعة الأزهر"
    ];
}
