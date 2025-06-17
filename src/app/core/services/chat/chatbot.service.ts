import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

    private chatUrl = 'http://51.21.124.246/chat';
  private analyzeUrl = 'http://51.21.124.246/analyze';

  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    return this.http.post(this.chatUrl, { message });
  }

  analyzeImage(imageFile: File) {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.post(this.analyzeUrl, formData);
  }
}
