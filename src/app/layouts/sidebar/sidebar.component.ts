import { Component } from '@angular/core';
import { HomeComponent } from "../../pages/home/home.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [HomeComponent,RouterLink,RouterOutlet,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
