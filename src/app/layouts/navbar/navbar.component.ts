import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

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
}
