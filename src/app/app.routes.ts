 import { Routes } from '@angular/router';
import { HomeAdminComponent } from './pages/admin/home-admin/home-admin.component';
import { ClinicAdminComponent } from './pages/admin/clinic-admin/clinic-admin.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { NewsAdminComponent } from './pages/admin/news/news-admin/news-admin.component';
import { StudentsComponent } from './pages/admin/students/students.component';
import { AddNewsComponent } from './pages/admin/news/add-news/add-news.component';
import { HomeComponent } from './pages/home/home.component';
import { ClinicsComponent } from './pages/student/clinics-student/clinics.component';
import { NewsComponent } from './pages/news/news.component';
import { AppointmentsStudentComponent } from './pages/student/appointments-student/appointments-student.component';
import { MdeicalRecordsComponent } from './pages/student/mdeical-records-student/mdeical-records.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { BookAppointmentComponent } from './pages/student/book-appointment/book-appointment.component';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';
import { DoctorsComponent } from './pages/admin/doctors/doctors.component';
import { ClinicAppointmentsComponent } from './pages/admin/clinic-appointments/clinic-appointments.component';
import { AddDoctorComponent } from './pages/admin/add-doctor/add-doctor.component';
import { AddClinicComponent } from './pages/admin/add-clinic/add-clinic.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { adminguardGuard } from './core/guards/admin/adminguard.guard';
import { authGuard } from './core/guards/auth/auth.guard';
import { DoctorAccountComponent } from './pages/doctor/doctor-account/doctor-account.component';
import { userGuard } from './core/guards/user/user.guard';
import { doctorGuard } from './core/guards/doctor/doctor.guard';
import { PatientAccountComponent } from './pages/student/patient-account/patient-account.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';

export const routes: Routes = [




/****************all if any one not logged in***************** */

// {
//   path:'',
//   redirectTo:'home',
//   pathMatch:'full'
// },
{
    path:'home',
    component:HomeComponent,
    title:'الرئيسية'
},
{
    path:'clinics-student',
    component:ClinicsComponent,
    title:'العيادات'
},
{
    path:'news',
    component:NewsComponent,
    title:'الاخبار'
},
{
  path:'news-details/:id',
  component:NewsDetailsComponent,
  title:'تفاصيل الخبر'
},
{
    path:'about us',
    component:AboutUsComponent,
    title:'من نحن'
},
{
    path:'contact us',
    component:ContactUsComponent,
    title:'تواصل معنا'
},
{
  path:'register',
  component:RegisterComponent,
  title:'إنشاء حساب',
  canActivate: [authGuard]
},
{
  path:'login',
  component:LoginComponent,
  title:'تسجيل الدخول',
  canActivate: [authGuard]
},
{
  path:'forgetPassword',
  component:ForgetPasswordComponent,
  title:'تعديل كلمة السر',
  canActivate: [authGuard]
},

// ******************if user logged in**********************

{
    path:'patientAccount',
    component:PatientAccountComponent,
    title:'حسابي',
    canActivate: [userGuard]
},
{
    path:'appointment-student',
    component:AppointmentsStudentComponent,
    title:'المواعيد',
    canActivate: [userGuard]
},
{
    path:'medical-record',
    component:MdeicalRecordsComponent,
    title:'السجل الطبي',
    canActivate: [userGuard]
},
{
    path:'book appointment',
    component:BookAppointmentComponent,
    title:'إنشاء ميعاد',
    canActivate: [userGuard]
},

/***********************if doctor logged in****************** */
{
  path:'doctorAccount',
  component:DoctorAccountComponent,
  title:'حسابي',
  canActivate: [doctorGuard]
},

// ******************************admin pages***************************/


{
  path:'homeAdmin',
  component:HomeAdminComponent,
  title:'home',
  canActivate: [adminguardGuard]
},
{
  path:'clinic-admin',
  component: ClinicAdminComponent,
  title:'clinics',
  canActivate: [adminguardGuard]
},
{
  path:'add-clinic',
  component: AddClinicComponent,
  title:'add-clinic',
  canActivate: [adminguardGuard]
},
{
  path:'dashboard',
  component:DashboardComponent,
  title:'dashboard',
  canActivate: [adminguardGuard]
},
{
  path:'news-admin',
  component:NewsAdminComponent,
  title:'news',
  canActivate: [adminguardGuard]
},

{
      path:'add-news',
      component:AddNewsComponent,
      title:'add news',
      canActivate: [adminguardGuard]
},

{
  path:'students',
  component:StudentsComponent,
  title:'students',
  canActivate: [adminguardGuard]
},
{
  path:'doctors',
  component:DoctorsComponent,
  title:'doctors',
  canActivate: [adminguardGuard]
},
{
  path:'add-doctor',
  component:AddDoctorComponent,
  title:'add-doctor',
  canActivate: [adminguardGuard]
},
{
  path:'clinic-appointments',
  component:ClinicAppointmentsComponent,
  title:'clinic-appointments',
  canActivate: [adminguardGuard]

},



];
