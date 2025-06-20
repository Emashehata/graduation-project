import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NewsService } from '../../../../core/services/news/news.service';
import { Inews } from '../../../../core/interfaces/Inews/inews';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news-admin',
  imports: [RouterOutlet, RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './news-admin.component.html',
  styleUrl: './news-admin.component.css',
})
export class NewsAdminComponent implements OnInit {
  private readonly newsService = inject(NewsService);
  private readonly formBuilder= inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  news: Inews[] = [];
  displayedNews: Inews[] = [];
  selectedNewsId: string | null = null;
  selectedValue: string = '12';

  searchTerm: string = '';
  itemsPerPage: number = 12;
  pageSizeOptions: number[] = [12, 15, 20];
  selectedFiles: { [id: string]: File | null } = {};
  isLoading: boolean = false;
  updateNewsForm!:FormGroup;
    ngOnInit(): void {
    this.getNewsData();
    this.updateNewsForm = this.formBuilder.group({
                        title:[null],
                        content:[null],
                        image:[null],
              })
  }

  getNewsData(): void {
    this.newsService.getAllNews().subscribe({
      next: (res) => {
        this.news = res;
        console.log(res);

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
      newsItem.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.displayedNews = filteredNews.slice(0, this.itemsPerPage);
  }

  filterNews(): void {
    // Call update after each search change to filter and paginate
    this.updateDisplayedNews();
  }

   deleteSpecficNews(id:string):void{
    this.newsService.deleteSpecficNews(id).subscribe({
      next:(res)=>{
        console.log(res);

          this.toastrService.success('تم حذف الخبر بنجاح.');
          this.getNewsData();


      }
    })
  }


  formatDateArabic(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  onFileSelected(event: Event, id: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles[id] = input.files[0];
    } else {
      this.selectedFiles[id] = null;
    }
  }

  patchValue(news:any):void{
    this.updateNewsForm.patchValue(news);
    // this.selectedFile = null;
  }

  submitUpdateNewsForm(id: string): void {
    if (this.updateNewsForm.invalid) {
      this.updateNewsForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = new FormData();

    if (this.updateNewsForm.get('title')?.value) {
      formData.append('title', this.updateNewsForm.get('title')?.value);
    }

    if (this.selectedFiles[id]) {
      formData.append('image', this.selectedFiles[id] as File);
    }

    if (this.updateNewsForm.get('content')?.value) {
      formData.append('content', this.updateNewsForm.get('content')?.value);
    }

    this.newsService.updateNews(formData, id).pipe(
      finalize(() => (this.isLoading = false))
    ).subscribe({
      next: () => {
        this.toastrService.success('تم تعديل بيانات الخبر بنجاح');
        this.getNewsData();
        this.selectedFiles[id] = null;
      }
    });
  }



}
