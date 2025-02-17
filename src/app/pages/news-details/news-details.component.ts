import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../core/services/news/news.service';
import { Inews } from '../../core/interfaces/Inews/inews';

@Component({
  selector: 'app-news-details',
  imports: [],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css'
})
export class NewsDetailsComponent implements OnInit {


  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly newsService= inject(NewsService);

  detailsNews:Inews={} as Inews;
  img:string='';

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe({
        next:(res)=>{
          let idNews=res.get('id');

          this.newsService.getSpecficNews(idNews).subscribe({
            next:(res)=>{
              this.detailsNews=res;
              console.log(res.imagePath);
              this.img=res.imagePath;


            },
            error:(err)=>{
              console.log(err);

            }
          })
        }
      })
  }

}
