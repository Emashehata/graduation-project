import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private httpClient:HttpClient) { }
   private readonly formBuilder= inject(FormBuilder);
   private readonly toastrService = inject(ToastrService);

  forgetPassword(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}api/Authentication/Forget-Password`,data,{
       responseType: 'text'
    });

  }
  verifyCode(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}api/Authentication/Verify-Code`,data,{
      responseType: 'text'
   });
  }
  resetPasswordAfterVervication(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}api/Authentication/Reset-Password`,data,{
      responseType: 'text'
   });
  }
  changePasswordWithToken(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}api/Authentication/Change-Password`,data,{
      responseType: 'text'
   });
  }

  changePasswordForm!:FormGroup;
  initChangePasswordForm(): void {
    this.changePasswordForm=this.formBuilder.group({
      oldPassword:[null,Validators.required],
      newPassword: [null, [Validators.required,Validators.minLength(10),
                Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/)]],
      confirmPassword:[null,[Validators.required]]
    }
    ,
            {
              validators: [this.passwordMatchValidator]
            }
  )
  }

      sumbitChangePasswordForm():void{
        if(this.changePasswordForm.valid){
          this.changePasswordWithToken(this.changePasswordForm.value).subscribe({
            next: (res) => {
              if (typeof res === 'string') {
                console.log(res); // Handle text response
                this.changePasswordForm.reset();
                this.toastrService.success(res);

              }

            }
          })
        }
        else{
          this.changePasswordForm.markAllAsTouched();
        }

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


}
