import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-news-admin',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './news-admin.component.html',
  styleUrl: './news-admin.component.css'
})
export class NewsAdminComponent {

}
