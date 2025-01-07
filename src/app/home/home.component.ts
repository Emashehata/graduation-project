import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: false,
  //   dots: true,
  //   navSpeed: 600,
  //   autoplay:false,
  //   // autoplayTimeout: 4000,
  //   navText: ['', ''],
  //   items:3,
  //   nav: true,
  //   rtl: true,



  // }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots:false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true,
    rtl: true,
  }
  imgs:string[]=[
    "/clinic.jpg",
    "/clinic.jpg",
    "/clinic.jpg",
    "/clinic.jpg",
    "/clinic.jpg",
    "/clinic.jpg",
    "/clinic.jpg",
    "/clinic.jpg",
    "/clinic.jpg",
    "/clinic.jpg",
    "/clinic.jpg",
    "/clinic.jpg",
  ]

}
