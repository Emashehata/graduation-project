import { ChangeDetectorRef, Component, computed, HostListener, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { DoctorService } from '../../core/services/doctor/doctor.service';
import { IDoctor } from '../../core/interfaces/idoctor/idoctor';
import { PatientService } from '../../core/services/patient/patient.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

    readonly authService=inject(AuthService);
    private readonly doctorService=inject(DoctorService);
    private readonly patientService=inject(PatientService);
    private readonly cdr = inject(ChangeDetectorRef);


    scroll:boolean=false;

    medicalEmail:string="Studenthealthcare@unv.tanta.edu.eg";
    // @HostListener('window:scroll') onScroll(){
    //   if(window.scrollY > window.innerHeight){
    //     this.scroll=true;

    //   }
    //   else{
    //     this.scroll=false;
    //   }
    // }


    doctorImg:string='';
    firstName:string='';
    lastName:string='';
    patientImg:string='';
    patientFirstName :string='';
    patientLastName :string='';

    ngOnInit(): void {
      if(this.authService.isLogin()){
        this.fetchUserData();
      }
      this.subscribeToDoctorData();
      this.subscribeToPatientData();

    }


    subscribeToPatientData(): void {

      this.patientService.patientImg.subscribe({
        next:(img)=>{
          this.patientImg=img;
          console.log(this.patientImg);
          this.cdr.detectChanges(); // Force UI update

        }
      })

      this.patientService.patientFirstName.subscribe({
        next:(name)=>{
          this.patientFirstName=name;
          console.log(this.patientFirstName);
          this.cdr.detectChanges(); // Force UI update

        }
      })
      this.patientService.patientLastName.subscribe({
        next:(name)=>{
          this.patientLastName=name;
          console.log(this.patientLastName);
          this.cdr.detectChanges(); // Force UI update

        }
      })

    }
    subscribeToDoctorData(): void {
      this.doctorService.doctorImg.subscribe({
        next:(img)=>{
          this.doctorImg=img;
          console.log(this.patientImg);

        }
      })

      this.doctorService.firstName.subscribe({
        next:(name)=>{
          this.firstName=name;
          console.log(this.patientFirstName);

        }
      })
      this.doctorService.lastName.subscribe({
        next:(name)=>{
          this.lastName=name;
          console.log(this.patientLastName);

        }
      })

    }

    getPatientAccount():void{
      this.patientImg = '';
      this.patientFirstName = '';
      this.patientLastName = '';
      this.cdr.detectChanges(); // Force UI update
      this.patientService.getPatientByToken().subscribe({
          next:(res)=>{
            if (res.success) {


              console.log(res.data);
              this.patientService.patientImg.next(res.data.imageUrl);
              this.patientService.patientFirstName.next(res.data.firstName);
              this.patientService.patientLastName.next(res.data.lastName);

            }

          }
      })
    }


    getDoctorsAccount():void{
      this.doctorImg = '';
      this.firstName = '';
      this.lastName = '';
      this.cdr.detectChanges();
      this.doctorService.getDoctorByID(this.authService.userId()!).subscribe({
          next:(res)=>{
            if (res.success) {
              console.log(res.data);
              this.doctorService.doctorImg.next(res.data.imageUrl);
              this.doctorService.firstName.next(res.data.firstName);
              this.doctorService.lastName.next(res.data.lastName);

            }

          }
      })
    }


    fetchUserData(): void {
      this.getPatientAccount();
      this.getDoctorsAccount();
    }






}
