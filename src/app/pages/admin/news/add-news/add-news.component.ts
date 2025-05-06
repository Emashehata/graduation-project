import { ToastrService } from 'ngx-toastr';
import { Component, inject } from '@angular/core';
import { NewsService } from '../../../../core/services/news/news.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { imageTypeValidator, fileSizeValidator } from '../../../../custom vaildators/vaildtors';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-news',
  imports: [ReactiveFormsModule],
  templateUrl: './add-news.component.html',
  styleUrl: './add-news.component.css'
})
export class AddNewsComponent {

    private readonly newsService=inject(NewsService);
    private readonly formBuilder= inject(FormBuilder);
    private readonly toastrService=inject(ToastrService)
    private readonly router= inject(Router);


    isLoading:boolean=false;

    selectedFile: File | null = null;

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}

    newsForm:FormGroup =this.formBuilder.group({
      title:[null,[Validators.required]],
      content:[null,[Validators.required]],
      image:[null, [Validators.required]],
    })



    sumbitForm(): void {
      if (this.newsForm.valid && this.selectedFile) {
        this.isLoading = true;

        // Convert Form Values to FormData
        const formData = new FormData();
        formData.append('title', this.newsForm.get('title')?.value);
        formData.append('content', this.newsForm.get('content')?.value);
        formData.append('image', this.selectedFile); // Append file

        this.newsService.postNews(formData).subscribe({
          next: (res) => {
            console.log(res);
              this.toastrService.success(res.message);
              this.router.navigate(['./news-admin']);
            this.isLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.isLoading = false;
          }
        });
      } else {
        this.newsForm.markAllAsTouched();
      }
    }






}
