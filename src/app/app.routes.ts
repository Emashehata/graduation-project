import { Routes } from '@angular/router';
import { HomeAdminComponent } from './pages/admin/home-admin/home-admin.component';
import { ClinicAdminComponent } from './pages/admin/clinic-admin/clinic-admin.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { NewsAdminComponent } from './pages/admin/news/news-admin/news-admin.component';
import { StudentsComponent } from './pages/admin/students/students.component';
import { AddNewsComponent } from './pages/admin/news/add-news/add-news.component';
import { DeleteNewsComponent } from './pages/admin/news/delete-news/delete-news.component';
import { DisplayNewsByIdComponent } from './pages/admin/news/display-news-by-id/display-news-by-id.component';

export const routes: Routes = [
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
  path:'dashboard',
  component:DashboardComponent,
  title:'dashboard'
},
{
  path:'news-admin',
  component:NewsAdminComponent,
  title:'news'},
    {path:'add news',
      component:AddNewsComponent,
      title:'add news'
    },
    {path:'delete news',
      component:DeleteNewsComponent,
      title:'delete news'
    },
    {path:'display news',
      component:DisplayNewsByIdComponent,
      title:'display news'

   },
{
  path:'students',
  component:StudentsComponent,
  title:'students'
},

];
