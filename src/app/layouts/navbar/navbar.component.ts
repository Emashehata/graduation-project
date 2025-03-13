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


    doctorData: WritableSignal<IDoctor | null> = signal(null);

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


    doctorImg = signal('');
    firstName = signal('');
    lastName = signal('');
    patientImg= signal('');
    patientFirstName = signal('');
    patientLastName = signal('');

    ngOnInit(): void {
      this.firstName.set(localStorage.getItem('firstName') || '');
      this.lastName.set(localStorage.getItem('lastName') || '');
      this.doctorImg.set(localStorage.getItem('doctorImg') || '');

      this.patientImg.set(localStorage.getItem('patientImg') || '');
      this.patientFirstName.set(localStorage.getItem('patientFirstName') || '');
      this.patientLastName.set(localStorage.getItem('patientLastName') || '');

      this.subscribeToDoctorData();
      this.subscribeToPatientData();
    }

    subscribeToDoctorData(): void {
      this.doctorService.doctorImg.subscribe(img => {
        console.log('Navbar received image:', img);
        this.doctorImg.set(img);
      });

      this.doctorService.firstName.subscribe(name => {
        console.log('Navbar received first name:', name);
        this.firstName.set(name);
      });

      this.doctorService.lastName.subscribe(name => {
        console.log('Navbar received last name:', name);
        this.lastName.set(name);
      });
    }
    subscribeToPatientData(): void {
      this.patientService.patientImg.subscribe(img => {
        console.log('Navbar received image:', img);
        this.patientImg.set(img);
      });

      this.patientService.patientFirstName.subscribe(name => {
        console.log('Navbar received first name:', name);
        this.patientFirstName.set(name);
      });

      this.patientService.patientLastName.subscribe(name => {
        console.log('Navbar received last name:', name);
        this.patientLastName.set(name);
      });
    }






}
