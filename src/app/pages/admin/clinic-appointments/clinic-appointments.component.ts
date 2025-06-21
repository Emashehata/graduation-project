import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AdminClinicsService } from '../../../core/services/admin-clinics/admin-clinics.service';
import { IAdminBooking } from '../../../core/interfaces/IAdminBooking/iadmin-booking';
// import { Chart } from 'chart.js';
import {
  Chart,
  DoughnutController,
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
Chart.register(
  DoughnutController,
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-clinic-appointments',
  imports: [],
  templateUrl: './clinic-appointments.component.html',
  styleUrl: './clinic-appointments.component.css'
})
export class ClinicAppointmentsComponent implements OnInit{

   private readonly bookingService = inject(AdminClinicsService);

  totalBookings = 0;
  todayBookings = 0;

  @ViewChild('clinicChart') clinicChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('monthlyChart') monthlyChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('collegeChart') collegeChart!: ElementRef<HTMLCanvasElement>;
  ngOnInit(): void {
     this.bookingService.getBookingsData().subscribe({
      next: (res: IAdminBooking) => {
        // كروت الإحصائيات
        this.totalBookings = res.counts.totalBookings;
        this.todayBookings = res.counts.todayBookings;

        // إنشاء الرسوم البيانية
        this.createClinicChart(res.mostUsedClinics);
        this.createMonthlyChart(res.monthlyBookings);
        this.createCollegeChart(res.topBookingColleges);
      },
      error: err => {
        console.error('Error loading booking dashboard:', err);
      }
    });
  }
   createClinicChart(data: { clinic: string, count: number }[]) {
    new Chart(this.clinicChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: data.map(item => item.clinic),
        datasets: [{
          data: data.map(item => item.count),
          backgroundColor: ['#0ea5e9', '#38bdf8', '#0284c7', '#0369a1', '#7dd3fc'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  createMonthlyChart(data: { month: string, count: number }[]) {
    new Chart(this.monthlyChart.nativeElement, {
      type: 'bar',
      data: {
        labels: data.map(item => item.month),
        datasets: [{
          label: 'عدد الحجوزات',
          data: data.map(item => item.count),
          backgroundColor: '#0ea5e9'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'الحجوزات الشهرية' }
        }
      }
    });
  }

  createCollegeChart(data: { college: string, count: number }[]) {
    new Chart(this.collegeChart.nativeElement, {
      type: 'bar',
      data: {
        labels: data.map(item => item.college),
        datasets: [{
          label: 'عدد الحجوزات',
          data: data.map(item => item.count),
          backgroundColor: '#0284c7'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'الكليات الأعلى حجزاً' }
        }
      }
    });
  }
}
