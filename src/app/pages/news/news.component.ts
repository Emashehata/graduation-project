import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Inews } from '../../core/interfaces/Inews/inews';
import { NewsService } from '../../core/services/news/news.service';
import { FormsModule } from '@angular/forms'; // ✅ استيراد FormsModule لدعم ngModel

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule], // ✅ إضافة FormsModule هنا
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  private readonly newsService = inject(NewsService);
  news: Inews[] = [];
  filteredNews: Inews[] = []; // ✅ قائمة الأخبار المفلترة
  reversedNews:Inews[]=[];
  searchTerm: string = ''; // ✅ متغير البحث

  ngOnInit(): void {
    this.getNewsData();
  }

  getNewsData(): void {
    this.newsService.getAllNews().subscribe({
      next: (res) => {
        console.log(res);
        this.news = res;
        this.filteredNews = res; // ✅ عرض كل الأخبار في البداية
        this.reversedNews = [...this.filteredNews].reverse();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  searchNews(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredNews = this.news; // ✅ عرض كل الأخبار عند عدم وجود بحث
    } else {
      const searchWords = this.searchTerm.trim().toLowerCase().split(/\s+/); // ✅ تقسيم الجملة إلى كلمات

      this.filteredNews = this.news.filter(newsItem => {
        const title = newsItem.title.toLowerCase();
        const content = newsItem.content.toLowerCase();

        // ✅ البحث عن أي كلمة داخل العنوان أو المحتوى
        return searchWords.some(word => title.includes(word) || content.includes(word));
      });
    }
  }

  formatDateArabic(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  trackById(index: number, item: Inews): string {
    return item.id; // ✅ إرجاع `id` كنص
  }
}
