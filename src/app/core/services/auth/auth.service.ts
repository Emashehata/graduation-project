import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Inject,
  Injectable,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { IdecodedToken } from '../../interfaces/IdecodedToken/idecoded-token';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private id: object
  ) {
    this.restoreUserData();
  }
  userData: WritableSignal<any> = signal(null);
  userId: WritableSignal<string | null> = signal(null);
  private readonly router = inject(Router);
  private readonly doctorService = inject(DoctorService);
  private readonly patientService = inject(PatientService);

  registerPatient(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}api/Authentication/RegisterPatient`,
      data
    );
  }

  registerDoctor(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}api/Authentication/RegisterDoctor`,
      data
    );
  }

  login(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}api/Authentication/login`,data
    );
  }

  saveUserData(): void {
    if (isPlatformBrowser(this.id)) {
      const token = localStorage.getItem('user token');

      if (token !== null) {
        const decodedToken = jwtDecode<IdecodedToken>(token);
        this.userData.set(decodedToken);
        console.log('user data', this.userData());
        const userID =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ] || null;
        this.userId.set(userID);
        console.log(this.userId());
      }
    }
  }
  /***check if the user is login or not*** */
  isLogin = computed(() => !!this.userData());

  /**** Call this method after login ****/
  handleLoginSuccess(response: any): void {
    if (isPlatformBrowser(this.id)) {
      localStorage.setItem('user token', response.token);
      this.saveUserData();
      this.userData.update((user) => ({ ...user }));
      if (this.isDoctor()) {
        this.doctorService.getDoctorByID(this.userId()!).subscribe({
          next: (res) => {
            if (res.success) {
              this.doctorService.doctorImg.next(res.data.imageUrl);
              this.doctorService.firstName.next(res.data.firstName);
              this.doctorService.lastName.next(res.data.lastName);
            }
          },
        });
      }

      if (this.isUser()) {
        this.patientService.getPatientByToken().subscribe({
          next: (res) => {
            if (res.success) {
              this.patientService.patientImg.next(res.data.imageUrl);
              this.patientService.patientFirstName.next(res.data.firstName);
              this.patientService.patientLastName.next(res.data.lastName);
            }
          },
        });
      }
    }
  }

  /*****check role of user***** */

  isAdmin(): boolean {
    return (
      this.userData()?.[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ] === 'Admin'
    );
  }

  isDoctor(): boolean {
    return (
      this.userData()?.[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ] === 'Doctor'
    );
  }
  isUser(): boolean {
    return (
      this.userData()?.[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ] === 'User'
    );
  }
  restoreUserData(): void {
    this.saveUserData(); // Load user data on refresh
  }
  logOut(): void {
    this.doctorService.doctorImg.next('');
    this.doctorService.firstName.next('');
    this.doctorService.lastName.next('');

    this.patientService.patientImg.next('');
    this.patientService.patientFirstName.next('');
    this.patientService.patientLastName.next('');
    this.userData.set(null);
    this.userId.set(null);
    localStorage.removeItem('user token');
    // this.router.navigate(['/login']);
    // window.location.reload();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 0);
  }
}
