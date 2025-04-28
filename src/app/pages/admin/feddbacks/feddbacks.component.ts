import { AfterViewInit, Component, NgModule, OnInit } from '@angular/core';
import { FeedbackService } from '../../../core/services/feedback/feedback.service';
import { Feedback } from '../../../core/interfaces/IFeedback/ifeedback';
import { Chart, ChartOptions, registerables } from 'chart.js';
import { pipe } from 'rxjs';
import { CommonModule } from '@angular/common';


Chart.register(...registerables);
@Component({
  selector: 'app-feddbacks',
  imports: [CommonModule],
  templateUrl: './feddbacks.component.html',
  styleUrl: './feddbacks.component.css'
})
export class FeddbacksComponent implements OnInit  {


  // feedbackList: any[] = [];
  // totalResponses: number = 0;
  // averageRating: number = 0;
  // recentComments: string[] = [];

  // questions = [
  //   { key: 'receptionServiceRating', label: 'Reception Service' },
  //   { key: 'medicalServiceRating', label: 'Medical Service' },
  //   { key: 'dispensedMedicationRating', label: 'Dispensed Medication' },
  //   { key: 'internationalizationRating', label: 'Internationalization' },
  //   { key: 'receptionComplaintsRating', label: 'Reception Complaints' },
  //   { key: 'environmentRating', label: 'Environment' }
  // ];

  // ratingOptions: string[] = ['غير مقبول', 'مقبول', 'جيد', 'جيد جداً', 'ممتاز'];
  // chartData: { [key: string]: number[] } = {};

  // chartOptions: ChartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'bottom'
  //     }
  //   }
  // };

  // constructor(private feedbackService: FeedbackService) {}

  // ngOnInit(): void {
  //   this.loadFeedback();
  // }

  // loadFeedback() {
  //   this.feedbackService.getFeedback().subscribe(res => {
  //     this.feedbackList = res;
  //     this.totalResponses = res.length;
  //     this.recentComments = res
  //       .filter(fb => fb.comments && fb.comments.trim() !== '')
  //       .slice(-3)
  //       .map(fb => fb.comments);

  //     this.calculateAverageRating();
  //     this.prepareChartData();
  //   });
  // }

  // calculateAverageRating() {
  //   let totalScore = 0;
  //   let count = 0;

  //   const ratingValues: any = {
  //     'غير مقبول': 1,
  //     'مقبول': 2,
  //     'جيد': 3,
  //     'جيد جداً': 4,
  //     'ممتاز': 5
  //   };

  //   this.feedbackList.forEach(fb => {
  //     this.questions.forEach(q => {
  //       const rate = fb[q.key];
  //       if (ratingValues[rate] !== undefined) {
  //         totalScore += ratingValues[rate];
  //         count++;
  //       }
  //     });
  //   });

  //   this.averageRating = count > 0 ? +(totalScore / count).toFixed(2) : 0;
  // }

  // prepareChartData() {
  //   this.questions.forEach(q => {
  //     const counts: { [key: string]: number } = {
  //       'غير مقبول': 0,
  //       'مقبول': 0,
  //       'جيد': 0,
  //       'جيد جداً': 0,
  //       'ممتاز': 0
  //     };

  //     this.feedbackList.forEach(fb => {
  //       const value = fb[q.key];
  //       if (counts.hasOwnProperty(value)) {
  //         counts[value]++;
  //       }
  //     });

  //     this.chartData[q.key] = Object.values(counts);
  //   });
  // }



  feedbackList: any[] = [];
  totalResponses: number = 0;
  averageRating: number = 0;
  averageRatingPercentage: number = 0;
  recentComments: string[] = [];
  allComments: string[] = [];
  positivePercentages: { [key: string]: number } = {};

  questions = [
    { key: 'receptionServiceRating', label: 'خدمة الاستقبال' },
    { key: 'medicalServiceRating', label: 'الخدمة الطبية' },
    { key: 'dispensedMedicationRating', label: 'الأدوية المصروفة' },
    { key: 'internationalizationRating', label: 'التحويلات' },
    { key: 'receptionComplaintsRating', label: 'شكاوى الاستقبال' },
    { key: 'environmentRating', label: 'البيئة' }
  ];

  ratingOptions: string[] = ['غير مقبول', 'مقبول', 'جيد', 'جيد جداً', 'ممتاز'];
  chartData: { [key: string]: number[] } = {};

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  };

  constructor(private feedbackService: FeedbackService) {}

  

  ngOnInit(): void {
    this.loadFeedback();
  }
  

  loadFeedback() {
    this.feedbackService.getFeedback().subscribe({
      next: (res) => {
        this.feedbackList = res || [];
        this.totalResponses = this.feedbackList.length;
        this.recentComments = this.feedbackList
          .filter(fb => fb.comments && fb.comments.trim() !== '')
          .slice(-3)
          .map(fb => fb.comments);
        this.allComments = this.feedbackList
          .filter(fb => fb.comments && fb.comments.trim() !== '')
          .map(fb => fb.comments);

        this.calculateAverageRating();
        this.prepareChartData();

        // رسم الشارتات بعد تحميل البيانات
        this.createAverageRatingChart();
        this.createQuestionCharts();
      },
      error: () => {
        this.feedbackList = [];
        this.totalResponses = 0;
        this.recentComments = [];
        this.allComments = [];
      }
    });
  }

  calculateAverageRating() {
    let totalScore = 0;
    let count = 0;

    const ratingValues: { [key: string]: number } = {
      'غير مقبول': 1,
      'مقبول': 2,
      'جيد': 3,
      'جيد جداً': 4,
      'ممتاز': 5
    };

    this.feedbackList.forEach(fb => {
      this.questions.forEach(q => {
        const rate = fb[q.key];
        if (rate && ratingValues[rate] !== undefined) {
          totalScore += ratingValues[rate];
          count++;
        }
      });
    });

    this.averageRating = count > 0 ? +(totalScore / count).toFixed(2) : 0;
    this.averageRatingPercentage = this.averageRating * 20;
  }

  prepareChartData() {
    this.questions.forEach(q => {
      const counts: { [key: string]: number } = {
        'غير مقبول': 0,
        'مقبول': 0,
        'جيد': 0,
        'جيد جداً': 0,
        'ممتاز': 0
      };

      this.feedbackList.forEach(fb => {
        const value = fb[q.key];
        if (value && counts.hasOwnProperty(value)) {
          counts[value]++;
        }
      });

      this.chartData[q.key] = Object.values(counts);

      const total = this.chartData[q.key].reduce((a, b) => a + b, 0);
      const positiveRatings = this.chartData[q.key][2] + this.chartData[q.key][3] + this.chartData[q.key][4];
      this.positivePercentages[q.key] = total > 0 ? (positiveRatings / total) * 100 : 0;
    });
  }

  // دالة مساعدة لتحديد اللون حسب النسبة
  getColorByPercentage(percentage: number): string {
    if (percentage >= 80) return '#4caf50'; // أخضر
    if (percentage >= 60) return '#8bc34a'; // أخضر فاتح
    if (percentage >= 40) return '#ffc107'; // أصفر
    if (percentage >= 20) return '#ff9800'; // برتقالي
    return '#f44336'; // أحمر
  }

  createAverageRatingChart() {
    const ctx = document.getElementById('averageRatingChart') as HTMLCanvasElement;
    const percentage = isNaN(this.averageRatingPercentage) ? 0 : this.averageRatingPercentage;
    const data = [percentage, 100 - percentage];
    const color = this.getColorByPercentage(percentage);

    // تدمير الشارت القديم إن كان موجود
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['النسبة الإيجابية', 'الباقي'],
        datasets: [{
          data: data,
          backgroundColor: [color, '#e0e0e0'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });
  }

  createQuestionCharts() {
    this.questions.forEach(q => {
      const ctx = document.getElementById(`chart-${q.key}`) as HTMLCanvasElement;
      const percentage = isNaN(this.positivePercentages[q.key]) ? 0 : this.positivePercentages[q.key];
      const data = [percentage, 100 - percentage];
      const color = this.getColorByPercentage(percentage);

      // تدمير الشارت القديم إن كان موجود
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['النسبة الإيجابية', 'الباقي'],
          datasets: [{
            data: data,
            backgroundColor: [color, '#e0e0e0'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          cutout: '70%',
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          }
        }
      });
    });
  }

  getRatingDistribution(questionKey: string) {
    const distribution: { rating: string, count: number }[] = [];
    this.ratingOptions.forEach((rating, index) => {
      distribution.push({
        rating: rating,
        count: this.chartData[questionKey]?.[index] || 0
      });
    });
    return distribution;
  }
  




}
