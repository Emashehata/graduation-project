import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NewsService } from '../../../../core/services/news/news.service';
import { Inews } from '../../../../core/interfaces/Inews/inews';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-news-admin',
  imports: [RouterOutlet, RouterLink,FormsModule],
  templateUrl: './news-admin.component.html',
  styleUrl: './news-admin.component.css',
})
export class NewsAdminComponent implements OnInit {
  private readonly newsService = inject(NewsService);
  news: Inews[] = [];
  displayedNews: Inews[] = [];
  selectedNewsId: string | null = null;
  selectedValue: string = '12';

  searchTerm: string = '';
  itemsPerPage: number = 12;
  pageSizeOptions: number[] = [12, 15, 20];

  getNewsData(): void {
    this.newsService.getAllNews().subscribe({
      next: (res) => {
        this.news = res;
        this.updateDisplayedNews(); // Update displayed news after fetching
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateDisplayedNews(): void {
    // Paginate the news based on the selected page size
    const filteredNews = this.news.filter(newsItem =>
      newsItem.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      newsItem.content.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.displayedNews = filteredNews.slice(0, this.itemsPerPage);
  }

  filterNews(): void {
    // Call update after each search change to filter and paginate
    this.updateDisplayedNews();
  }

  setNewsIdForDeletion(id: string) {
    this.selectedNewsId = id;
  }

  deleteNews(): void {
    if (this.selectedNewsId !== null) {
      this.newsService.deleteSpecficNews(this.selectedNewsId).subscribe({
        next: () => {
          // Remove deleted item from the list
          this.news = this.news.filter(newsItem => newsItem.id !== this.selectedNewsId);
          this.selectedNewsId = null;
          this.updateDisplayedNews();
        },
        error: (err) => {
          console.error('Error deleting news:', err);
        },
      });
    }
  }

  ngOnInit(): void {
    this.getNewsData();
  }

  formatDateArabic(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  
}
