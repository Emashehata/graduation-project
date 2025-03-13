import { Component, inject } from '@angular/core';
import { HomeComponent } from "../../pages/home/home.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [HomeComponent,RouterLink,RouterOutlet,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  readonly authService = inject(AuthService);
}
