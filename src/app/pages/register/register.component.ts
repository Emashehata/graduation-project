import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);

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
    },
    {
      validators: [this.passwordMatchValidator]
    });
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
      this.authService.registerPatient(formData).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: (res) => {
          console.log(res);
          if (res.succeeded
            === true) {
            this.toastrService.success('تم إنشاء الحساب بنجاح.');
            setTimeout(() => {
              this.router.navigate(['./login']);
            }, 500);
          }
          else{
            res.errors.forEach((error: { code: string; description: string }) => {
              this.toastrService.error(error.description, error.code);
            });
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




  togglePassword() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword);

    this.cdr.detectChanges(); // Force UI update
  }

  toggleRePassword() {
    this.showRePassword = !this.showRePassword;
  }
  colleges: string[] = [
    "كلية الزراعة", "كلية الهندسة", "كلية التربية", "كلية الطب", "كلية الآداب", "كلية التربية الرياضية",
    "كلية التربية النوعية", "كلية التجارة", "كلية العلوم", "كلية الصيدلة", "كلية الحقوق", "كلية طب الأسنان",
    "كلية التمريض", "المعهد الفني للتمريض", "كلية الحاسبات والمعلومات", "كلية الفنون التطبيقية"
  ];
}
