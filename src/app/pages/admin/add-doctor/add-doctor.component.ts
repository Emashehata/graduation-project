import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ClinicsService } from '../../../core/services/clinics/clinics.service';
import { IClinic } from '../../../core/interfaces/Iclinic/iclinic';
import { DoctorService } from '../../../core/services/doctor/doctor.service';

@Component({
  selector: 'app-add-doctor',
  imports: [ReactiveFormsModule],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent {
     private readonly formBuilder = inject(FormBuilder);
      private readonly authService = inject(AuthService);
      private readonly router = inject(Router);
      private readonly toastrService = inject(ToastrService);
      private readonly clinicsService = inject(ClinicsService);
      private readonly doctorService=inject(DoctorService);


       clinicData: WritableSignal<IClinic[]> = signal([]);

      isLoading: boolean = false;
      showPassword:boolean = false;
      showRePassword: boolean = false;
      nationalIDPattern: string = "^[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{7}$";
      registerForm!: FormGroup;

      ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
          FirstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
          LastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
          Email: [null, [Validators.required, Validators.email]],
          Password: [null, [Validators.required,Validators.minLength(10),
            Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/)]],
          ConfirmPassword: [null, [Validators.required]],
          PhoneNumber: [null, [Validators.required, Validators.pattern(/^(?:\+20|0)1[0-25]\d{8}$/)]],
          College: [null, [Validators.required]],
          NationalID: [null, [Validators.required,Validators.minLength(14)]],
          ImageFile: [null, [Validators.required]],
          Specialty:[null,[Validators.required,Validators.minLength(10)]],
          Description:[null,[Validators.required,Validators.minLength(10)]],
          ClinicId:[null,[Validators.required]]
        },
        {
          validators: [this.passwordMatchValidator]
        });


        this.getClinicsData();
      }

      passwordMatchValidator(formGroup: AbstractControl) {
        const passwordControl = formGroup.get('Password');
        const confirmPasswordControl = formGroup.get('ConfirmPassword');

        if (!passwordControl || !confirmPasswordControl) {
          return null;
        }

        if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mismatch']) {
          return null;
        }

        if (passwordControl.value !== confirmPasswordControl.value) {
          confirmPasswordControl.setErrors({ mismatch: true });
        } else {
          confirmPasswordControl.setErrors(null);
        }
        return null;
      }


      submitRegisterForm(): void {
        if (this.registerForm.valid) {
          console.log('Form Data:', this.registerForm.value);

          const formData = new FormData();
          Object.entries(this.registerForm.value).forEach(([key, value]) => {
            if (key === 'ImageFile' && value) {
              formData.append(key, value as File);
            } else {
              formData.append(key, value as string);
            }
          });

          this.isLoading = true;
          this.authService.registerDoctor(formData).pipe(
            finalize(() => this.isLoading = false)
          ).subscribe({
            next: (res) => {
              console.log(res);
              if (res.success
                === true) {
                this.toastrService.success('تم إضافة الطبيب بنجاح.');
                this.doctorService.doctorImg.next(res.data.imageUrl);
                this.doctorService.firstName.next(res.data.firstName);
                this.doctorService.lastName.next(res.data.lastName);
                setTimeout(() => {
                  this.router.navigate(['./doctors']);
                }, 500);
              }
              else{
                this.toastrService.error(res.message);
              }
              this.isLoading = false;
            },
            error: (err) => {
              console.error('Error during registration:', err);
              this.toastrService.error('Registration failed. Please try again.');
            }
          });
        } else {
          this.registerForm.markAllAsTouched();
        }
      }

      onFileSelected(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
          const file = fileInput.files[0];
          this.registerForm.patchValue({ ImageFile: file });
          this.registerForm.get('ImageFile')?.updateValueAndValidity();
          console.log('Selected file:', file);
        }
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


      togglePassword() {
        this.showPassword = !this.showPassword;

      }

      toggleRePassword() {
        this.showRePassword = !this.showRePassword;
      }



      getClinicsData(): void {
        this.isLoading = true;
        this.clinicsService.getAllClinics().subscribe({
          next: (res) => {
            if (res.success) {
              this.clinicData.set(res.data);
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
}
