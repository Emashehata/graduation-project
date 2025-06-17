import { Routes } from '@angular/router';
import { adminguardGuard } from './core/guards/admin/adminguard.guard';
import { authGuard } from './core/guards/auth/auth.guard';
import { userGuard } from './core/guards/user/user.guard';
import { doctorGuard } from './core/guards/doctor/doctor.guard';

export const routes: Routes = [

  /********* Public *********/
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'الرئيسية' },
  { path: 'clinics-student', loadComponent: () => import('./pages/student/clinics-student/clinics.component').then(m => m.ClinicsComponent), title: 'العيادات' },
  { path: 'clinics-doctors/:id', loadComponent: () => import('./pages/student/clnics-dotors/clnics-dotors.component').then(m => m.ClnicsDotorsComponent), title: 'أطباء العيادة' },
  { path: 'doctor-details/:id', loadComponent: () => import('./pages/student/doctor-details/doctor-details.component').then(m => m.DoctorDetailsComponent), title: 'تفاصيل الطبيب' },
  { path: 'news', loadComponent: () => import('./pages/news/news.component').then(m => m.NewsComponent), title: 'الاخبار' },
  { path: 'news-details/:id', loadComponent: () => import('./pages/news-details/news-details.component').then(m => m.NewsDetailsComponent), title: 'تفاصيل الخبر' },
  { path: 'about us', loadComponent: () => import('./pages/about-us/about-us.component').then(m => m.AboutUsComponent), title: 'من نحن' },
  { path: 'contact us', loadComponent: () => import('./pages/contact-us/contact-us.component').then(m => m.ContactUsComponent), title: 'تواصل معنا' },
  { path: 'chat bot', loadComponent: () => import('./pages/chatbot/chatbot.component').then(m => m.ChatbotComponent), title: 'شات بوت' },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), title: 'إنشاء حساب', canActivate: [authGuard] },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: 'تسجيل الدخول', canActivate: [authGuard] },
  { path: 'forgetPassword', loadComponent: () => import('./pages/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent), title: 'تعديل كلمة السر', canActivate: [authGuard] },

  /********* Student *********/
  { path: 'patientAccount', loadComponent: () => import('./pages/student/patient-account/patient-account.component').then(m => m.PatientAccountComponent), title: 'حسابي', canActivate: [userGuard] },
  { path: 'appointment-student', loadComponent: () => import('./pages/student/appointments-student/appointments-student.component').then(m => m.AppointmentsStudentComponent), title: 'المواعيد', canActivate: [userGuard] },
  { path: 'book appointment', loadComponent: () => import('./pages/student/book-appointment/book-appointment.component').then(m => m.BookAppointmentComponent), title: 'إنشاء ميعاد', canActivate: [userGuard] },
  { path: 'booking/:id', loadComponent: () => import('./pages/student/booking/booking.component').then(m => m.BookingComponent), title: 'حجز ميعاد', canActivate: [userGuard] },
  { path: 'medical-record', loadComponent: () => import('./pages/student/medical-record/medical-record.component').then(m => m.MedicalRecordComponent), title: 'السجل الطبي', canActivate: [userGuard] },
  { path: 'feedback', loadComponent: () => import('./pages/student/feedback/feedback.component').then(m => m.FeedbackComponent), title: 'الاستبيان', canActivate: [userGuard] },
  { path: 'notification', loadComponent: () => import('./pages/student/notification/notification.component').then(m => m.NotificationComponent), title: 'الإشعارات', canActivate: [userGuard] },

  /********* Doctor *********/
  { path: 'doctorAccount', loadComponent: () => import('./pages/doctor/doctor-account/doctor-account.component').then(m => m.DoctorAccountComponent), title: 'حسابي', canActivate: [doctorGuard] },
  { path: 'appointment', loadComponent: () => import('./pages/doctor/appointment/appointment.component').then(m => m.AppointmentComponent), title: 'المواعيد المسجلة', canActivate: [doctorGuard] },
  { path: 'createAppointment', loadComponent: () => import('./pages/doctor/create-appointment/create-appointment.component').then(m => m.CreateAppointmentComponent), title: 'إنشاء ميعاد جديد', canActivate: [doctorGuard] },
  { path: 'updateAppointment/:id', loadComponent: () => import('./pages/doctor/updateappointment/updateappointment.component').then(m => m.UpdateappointmentComponent), title: 'تعديل الميعاد', canActivate: [doctorGuard] },
  { path: 'doctorBooking', loadComponent: () => import('./pages/doctor/doctor-booking/doctor-booking.component').then(m => m.DoctorBookingComponent), title: 'قائمة المواعيد', canActivate: [doctorGuard] },
  { path: 'examination/:patientId/:bookingId', loadComponent: () => import('./pages/doctor/examination/examination.component').then(m => m.ExaminationComponent), title: 'السجل الطبي', canActivate: [doctorGuard] },
  { path: 'add-examination/:patientId/:bookingId', loadComponent: () => import('./pages/doctor/add-examintaion/add-examintaion.component').then(m => m.AddExamintaionComponent), title: 'اضافة السجل الطبي', canActivate: [doctorGuard] },
  { path: 'edit-examination/:patientId/:bookingId/:examinationId', loadComponent: () => import('./pages/doctor/update-examination/update-examination.component').then(m => m.UpdateExaminationComponent), title: 'تعديل السجل الطبي', canActivate: [doctorGuard] },

  /********* Admin *********/
  { path: 'homeAdmin', loadComponent: () => import('./pages/admin/home-admin/home-admin.component').then(m => m.HomeAdminComponent), title: 'home', canActivate: [adminguardGuard] },
  { path: 'clinic-admin', loadComponent: () => import('./pages/admin/clinic-admin/clinic-admin.component').then(m => m.ClinicAdminComponent), title: 'clinics', canActivate: [adminguardGuard] },
  { path: 'add-clinic', loadComponent: () => import('./pages/admin/add-clinic/add-clinic.component').then(m => m.AddClinicComponent), title: 'add-clinic', canActivate: [adminguardGuard] },
  { path: 'dashboard', loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent), title: 'dashboard', canActivate: [adminguardGuard] },
  { path: 'news-admin', loadComponent: () => import('./pages/admin/news/news-admin/news-admin.component').then(m => m.NewsAdminComponent), title: 'news', canActivate: [adminguardGuard] },
  { path: 'add-news', loadComponent: () => import('./pages/admin/news/add-news/add-news.component').then(m => m.AddNewsComponent), title: 'add news', canActivate: [adminguardGuard] },
  { path: 'students', loadComponent: () => import('./pages/admin/students/students.component').then(m => m.StudentsComponent), title: 'students', canActivate: [adminguardGuard] },
  { path: 'doctors', loadComponent: () => import('./pages/admin/doctors/doctors.component').then(m => m.DoctorsComponent), title: 'doctors', canActivate: [adminguardGuard] },
  { path: 'add-doctor', loadComponent: () => import('./pages/admin/add-doctor/add-doctor.component').then(m => m.AddDoctorComponent), title: 'add-doctor', canActivate: [adminguardGuard] },
  { path: 'clinic-appointments', loadComponent: () => import('./pages/admin/clinic-appointments/clinic-appointments.component').then(m => m.ClinicAppointmentsComponent), title: 'clinic-appointments', canActivate: [adminguardGuard] },
  { path: 'feedbacks', loadComponent: () => import('./pages/admin/feddbacks/feddbacks.component').then(m => m.FeddbacksComponent), title: 'feedbacks', canActivate: [adminguardGuard] },
  { path: 'docAppoitment', loadComponent: () => import('./pages/admin/doc-appointment/doc-appointment.component').then(m => m.DocAppointmentComponent), title: 'مواعيد الاطباء', canActivate: [adminguardGuard] },
  { path: 'update-appointment/:id', loadComponent: () => import('./pages/admin/update-doctor-appointment/update-doctor-appointment.component').then(m => m.UpdateDoctorAppointmentComponent), title: 'تعديل الميعاد', canActivate: [adminguardGuard] },

  /********* Not Found *********/
  { path: '**', loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent), title: 'Not Found' }
];
