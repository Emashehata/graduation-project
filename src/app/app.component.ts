import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from "./layouts/sidebar/sidebar.component";
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { NavbarComponent } from "./layouts/navbar/navbar.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, SidebarComponent, AboutUsComponent, ContactUsComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'medical app';
  medicalEmail:string="Studenthealthcare@unv.tanta.edu.eg";
}
