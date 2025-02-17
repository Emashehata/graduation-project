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

export const routes: Routes = [


// ******************************admin***************************/


{
  path:'homeAdmin',
  component:HomeAdminComponent,
  title:'home'
},
{
  path:'clinic-admin',
  component: ClinicAdminComponent,
  title:'clinics'
},
{
  path:'add-clinic',
  component: AddClinicComponent,
  title:'add-clinic'
},
{
  path:'dashboard',
  component:DashboardComponent,
  title:'dashboard'
},
{
  path:'news-admin',
  component:NewsAdminComponent,
  title:'news'
},

{
      path:'add-news',
      component:AddNewsComponent,
      title:'add news'
},

{
  path:'students',
  component:StudentsComponent,
  title:'students'
},
{
  path:'doctors',
  component:DoctorsComponent,
  title:'doctors'
},
{
  path:'add-doctor',
  component:AddDoctorComponent,
  title:'add-doctor'
},
{
  path:'clinic-appointments',
  component:ClinicAppointmentsComponent,
  title:'clinic-appointments'

},
{
  path:'news-details/:id',
  component:NewsDetailsComponent,
  title:'تفاصيل الخبر'
},


/****************user***************** */

// {
//   path:'',
//   redirectTo:'home',
//   pathMatch:'full'
// },
// {
//   path:'news-details/:id',
//   component:NewsDetailsComponent,
//   title:'تفاصيل الخبر'
// },
// {
//     path:'home',
//     component:HomeComponent,
//     title:'الرئيسية'
// },
// {
//     path:'clinics-student',
//     component:ClinicsComponent,
//     title:'العيادات'
// },
// {
//     path:'news',
//     component:NewsComponent,
//     title:'الاخبار'
// },
// {
//     path:'appointment-student',
//     component:AppointmentsStudentComponent,
//     title:'المواعيد'
// },
// {
//     path:'medical-record',
//     component:MdeicalRecordsComponent,
//     title:'السجل الطبي'
// },
// {
//     path:'about us',
//     component:AboutUsComponent,
//     title:'من نحن'
// },
// {
//     path:'contact us',
//     component:ContactUsComponent,
//     title:'تواصل معنا'
// },
// {
//     path:'book appointment',
//     component:BookAppointmentComponent,
//     title:'إانشاء ميعاد'
// },



];
