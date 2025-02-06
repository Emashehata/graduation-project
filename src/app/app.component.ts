import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
 import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from "./layouts/sidebar/sidebar.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent,SidebarComponent, AboutUsComponent, ContactUsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'firstApp';
}
