import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordService } from '../../core/services/password/password.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit{
  private readonly formBuilder= inject(FormBuilder);
  private readonly passwordService=inject(PasswordService);
  private readonly router=inject(Router);
  private readonly toastrService=inject(ToastrService);
  showPassword:boolean = false;
  showRePassword: boolean = false;
  isLoading:boolean=false;
  step:number = 1;

  forgetPasswordForm!:FormGroup;
  verifyCodeForm!:FormGroup;
  createNewPassword! :FormGroup;
  ngOnInit(): void {
                  /**********email********* */
                  this.forgetPasswordForm = this.formBuilder.group({
                    email:[null,[Validators.required,Validators.email]],
                  }
                )

                            /************code************ */
            this.verifyCodeForm = this.formBuilder.group({
              code:[null ,[Validators.required,Validators.pattern(/^[0-9]{5,}$/)]]
            }
          )

             /*****************new password******************* */
             this.createNewPassword = this.formBuilder.group({
              newPassword: [null, [Validators.required,Validators.minLength(10),
                Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/)]],
              confirmPassword:[null,[Validators.required]]
            },
            {
              validators: [this.passwordMatchValidator]
            }
          );

  }



  passwordMatchValidator(formGroup: AbstractControl) {
    const passwordControl = formGroup.get('newPassword');
    const confirmPasswordControl = formGroup.get('confirmPassword');

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



    togglePassword() {
      this.showPassword = !this.showPassword;
      console.log(this.showPassword);
    }

    toggleRePassword() {
      this.showRePassword = !this.showRePassword;
    }

    sumbitForgetPasswordForm():void{
      if(this.forgetPasswordForm.valid){
        this.isLoading=true;
        this.passwordService.forgetPassword(this.forgetPasswordForm.value).pipe(finalize(() => this.isLoading = false)).subscribe({
          next: (res) => {
            if (typeof res === 'string') {
              console.log(res); // Handle text response
              this.toastrService.success(res);
              this.step = 2;
            }
            this.isLoading=false;
          }
        })
      }
      else{
        this.forgetPasswordForm.markAllAsTouched();
      }

    }
    sumbitVerifyCodeForm():void{
      if(this.verifyCodeForm.valid){
        this.isLoading=true;
        this.passwordService.verifyCode(this.verifyCodeForm.value).pipe(finalize(() => this.isLoading = false)).subscribe({
          next: (res) => {
            if (typeof res === 'string') {
              console.log(res); // Handle text response
              this.toastrService.success(res);
              this.step =3;
            }
            this.isLoading=false;
          }
        })
      }
      else{
        this.verifyCodeForm.markAllAsTouched();
      }

    }
    sumbitResetPasswordForm():void{
      if(this.createNewPassword.valid){
        this.isLoading=true;
        this.passwordService.resetPasswordAfterVervication(this.createNewPassword.value).pipe(finalize(() => this.isLoading = false)).subscribe({
          next: (res) => {
            if (typeof res === 'string') {
              console.log(res); // Handle text response
              this.toastrService.success(res);
              this.router.navigate(['/login'])
            }
            this.isLoading=false;
          }
        })
      }
      else{
        this.createNewPassword.markAllAsTouched();
      }

    }

}
