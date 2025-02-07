import {  AfterViewInit, Component, ElementRef, QueryList, ViewChildren, Renderer2 } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{

  @ViewChildren('counter') counters!: QueryList<ElementRef>;
  private observer!: IntersectionObserver;
  private originalValues: number[] = []; // Store original numbers

  facts = [
    { value: 22, label: 'عيادات الإدارة', icon: 'icofont icofont-home' },
    { value: 50, label: 'الأطباء المتخصصين', icon: 'icofont icofont-user-alt-3' },
    { value: 20000, label: 'الطلاب الراضون', icon: 'icofont-simple-smile' },
    { value: 15, label: 'سنوات الخبرة', icon: 'icofont icofont-table' }
  ];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const section = document.querySelector('.sec-four');

    if (section) {
      this.counters.forEach((counter, index) => {
        this.originalValues[index] = parseInt(counter.nativeElement.innerText, 10); // Store original numbers
      });

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.startCounting();
            }
          });
        },
        { threshold: 0.5 }
      );

      this.observer.observe(section);
    }
  }

  startCounting() {
    this.counters.forEach((counter, index) => {
      let target = this.originalValues[index]; // Use stored original number
      let count = 0;
      let step = Math.ceil(target / 100);

      let interval = setInterval(() => {
        count += step;
        if (count >= target) {
          count = target;
          clearInterval(interval);
        }
        this.renderer.setProperty(counter.nativeElement, 'innerText', this.toArabicNumbers(count));
      }, 20);
    });
  }

  // Convert Western numbers to Arabic
  toArabicNumbers(num: number): string {
    return num.toString().replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d]);
  }



}
