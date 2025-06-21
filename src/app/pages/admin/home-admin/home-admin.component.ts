import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomeAdminService } from '../../../core/services/HomeAdmin/home-admin.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
Chart.register(...registerables);

// Interfaces لتحديد شكل البيانات
interface Appointment {
  patientName: string;
  doctorName: string;
  date: string;
  status: string;
}

interface Comment {
  patientName: string;
  comment: string;
}

interface Stats {
  usersCount: number;
  doctorsCount: number;
  patientsCount: number;
  newsCount: number;
  bookingsCount: number;
  clinicsCount: number;
}

@Component({
  selector: 'app-home-admin',
  imports: [CommonModule  ],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit {

  stats: Stats | null = null;
  upcomingAppointments: Appointment[] = [];
  latestComments: Comment[] = [];

  @ViewChild('patientsByDayChart') patientsByDayChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('appointmentsByDayChart') appointmentsByDayChart!: ElementRef<HTMLCanvasElement>;

  // Mapping object لتحويل الأيام من الإنجليزية للعربية
  private dayMapping: { [key: string]: string } = {
    'Saturday': 'السبت',
    'Sunday': 'الأحد',
    'Monday': 'الإثنين',
    'Tuesday': 'الثلاثاء',
    'Wednesday': 'الأربعاء',
    'Thursday': 'الخميس',
    'Friday': 'الجمعة'
  };

  // ترتيب الأيام الإنجليزية (من السبت للجمعة)
  private dayOrder: string[] = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
  ];

  constructor(private homeService: HomeAdminService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadDashboardData();
    this.loadAvailableAppointments();
  }

  ngAfterViewInit(): void {}

  loadStats() {
    this.homeService.getCount().subscribe({
      next: (res: Stats) => {
        this.stats = res;
      },
      error: (err) => {
        console.error('Error loading stats:', err);
        this.stats = { usersCount: 0, doctorsCount: 0, patientsCount: 0, newsCount: 0, bookingsCount: 0,clinicsCount:0};
      }
    });
  }

  loadDashboardData() {
    this.homeService.getHome().subscribe({
      next: (res: { upcomingAppointments: Appointment[], latestComments: Comment[], patientsByDay: { day: string, count: number }[] }) => {
        this.upcomingAppointments = res.upcomingAppointments || [];
        this.latestComments = res.latestComments || [];

        // إنشاء قائمة بكل الأيام مع قيم افتراضية (0)
        const fullPatientsByDay: { day: string, count: number }[] = this.dayOrder.map(day => {
          const existingDay = res.patientsByDay?.find(x => x.day === day);
          return {
            day: day,
            count: existingDay ? existingDay.count : 0 // لو اليوم مش موجود، نرجع 0
          };
        });

        // ترتيب الأيام بناءً على dayOrder (للتأكيد)
        const sortedPatientsByDay = fullPatientsByDay.sort((a, b) => {
          return this.dayOrder.indexOf(a.day) - this.dayOrder.indexOf(b.day);
        });

        const labels = sortedPatientsByDay.map((x) => this.dayMapping[x.day] || x.day);
        const data = sortedPatientsByDay.map((x) => x.count);

        if (this.patientsByDayChart) {
          new Chart(this.patientsByDayChart.nativeElement, {
            type: 'doughnut',
            data: {
              labels: labels, // كل الأيام دلوقتي موجودة وبالعربي
              datasets: [
                {
                  data: data,
                  backgroundColor: ['#0d6efd', '#36a2eb', '#66b0ff', '#99c7ff', '#c0d6ff', '#e0e7ff', '#f0f4ff']
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          });
        }
      },
      error: (err) => {
        console.error('Error loading dashboard data:', err);
        this.upcomingAppointments = [];
        this.latestComments = [];
      }
    });
  }

  loadAvailableAppointments() {
    this.homeService.getAvailableAppointmentsByDay().subscribe({
      next: (res: { day: string, count: number }[]) => {
        const fullAppointmentsByDay: { day: string, count: number }[] = this.dayOrder.map(day => {
          const existingDay = res.find(x => x.day === day);
          return {
            day: day,
            count: existingDay ? existingDay.count : 0
          };
        });

        const sortedAppointmentsByDay = fullAppointmentsByDay.sort((a, b) => {
          return this.dayOrder.indexOf(a.day) - this.dayOrder.indexOf(b.day);
        });

        const labels = sortedAppointmentsByDay.map((x) => this.dayMapping[x.day] || x.day);
        const data = sortedAppointmentsByDay.map((x) => x.count);

        if (this.appointmentsByDayChart) {
          new Chart(this.appointmentsByDayChart.nativeElement, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  data: data,
                  label: 'المواعيد المتاحة',
                  tension: 0.4,
                  fill: true,
                  borderColor: '#36a2eb',
                  backgroundColor: 'rgba(54, 162, 235, 0.2)'
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { title: { display: true, text: 'الأيام' } },
                y: {
                  title: { display: true, text: 'عدد المواعيد' },
                  beginAtZero: true, // البداية من 0
                  ticks: {
                    stepSize: 1, // الخطوات بتكون 1 (أرقام صحيحة)
                    precision: 0 // التأكد من إن القيم تظهر بدون كسور عشرية
                  }
                }
              }
            }
          });
        }
      },
      error: (err) => {
        console.error('Error loading available appointments:', err);
      }
    });
  }



}
