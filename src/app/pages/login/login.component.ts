import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly formBuilder= inject(FormBuilder);
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
  private readonly toastrService=inject(ToastrService);
  showPassword:boolean = false;
  showRePassword: boolean = false;
  isLoading:boolean=false;


  loginForm!:FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,Validators.minLength(10),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/)]],
    }
  )
  }



  sumbitLoginForm():void{
    if(this.loginForm.valid){
      this.isLoading=true;
      this.authService.login(this.loginForm.value).pipe(finalize(() => this.isLoading = false)).subscribe({
        next: (res) => {
          console.log(res);

            this.toastrService.success('تم تسجيل دخولك بنجاح');
            setTimeout(() => {

            // Use handleLoginSuccess for consistency
            this.authService.handleLoginSuccess(res);
            if (this.authService.isAdmin()) {
              this.router.navigate(['/homeAdmin']);
            } else {
              this.router.navigate(['/home']);
            }

            }, 500);


          this.isLoading=false;
        },
        error:(err)=>{
          this.toastrService.error(err.error.message)
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched();
    }

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
