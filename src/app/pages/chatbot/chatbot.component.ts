import { Component } from '@angular/core';
import { ChatbotService } from '../../core/services/chat/chatbot.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  text?: string;
  imageUrl?: string;
  sender: 'user' | 'bot';
  loading?: boolean; // جديد
}

interface ImageAnalysisResponse {
  text_extracted?: string;
  raw_diagnosis?: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  message: string = '';
  chatHistory: ChatMessage[] = [];

  constructor(private chatbotService: ChatbotService) {}

  sendChat() {
    if (!this.message.trim()) return;

    this.chatHistory.push({ text: this.message, sender: 'user' });

    // أضف رسالة مؤقتة للانتظار
    const loadingMsg: ChatMessage = { text: '💬 جاري الكتابة...', sender: 'bot', loading: true };
    this.chatHistory.push(loadingMsg);

    this.chatbotService.sendMessage(this.message).subscribe(
      (res: any) => {
        const reply = res.reply || res.message || JSON.stringify(res);
        this.replaceLoadingMessage(this.sanitizeBotText(reply));
      },
      (err) => {
        this.replaceLoadingMessage('حدث خطأ أثناء إرسال الرسالة');
        console.error(err);
      }
    );

    this.message = '';
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.chatHistory.push({ imageUrl: reader.result as string, sender: 'user' });
      };
      reader.readAsDataURL(file);

      // أضف رسالة مؤقتة للانتظار
      const loadingMsg: ChatMessage = { text: '🧠 جاري تحليل الصورة...', sender: 'bot', loading: true };
      this.chatHistory.push(loadingMsg);

      this.chatbotService.analyzeImage(file).subscribe(
        (res: ImageAnalysisResponse) => {
          const diagnosis = res.raw_diagnosis ? this.formatDiagnosis(res.raw_diagnosis) : '';
          if (diagnosis) {
            this.replaceLoadingMessage(this.sanitizeBotText(`🩺 ملخص التقرير:\n${diagnosis}`));
          } else {
            this.replaceLoadingMessage('لم يتم العثور على تشخيص.');
          }
        },
        (err) => {
          this.replaceLoadingMessage('حدث خطأ أثناء تحليل الصورة');
          console.error(err);
        }
      );
    }
  }

  replaceLoadingMessage(newText: string) {
    const lastBotMsg = [...this.chatHistory].reverse().find(msg => msg.sender === 'bot' && msg.loading);
    if (lastBotMsg) {
      lastBotMsg.text = newText;
      lastBotMsg.loading = false;
    }
  }

  formatDiagnosis(raw: string): string {
    try {
      const jsonText = raw.match(/```json\n([\s\S]*?)\n```/)?.[1];
      if (jsonText) {
        const parsed = JSON.parse(jsonText);
        let output = `📌 ${parsed.summary}\n\n🔎 الحالة: ${parsed.identified_condition}\n\n❗ القيم غير الطبيعية:\n`;
        parsed.abnormal_values.forEach((v: any, i: number) => {
          output += `\n${i + 1}. ${v.test_name}:\n   ↪ القيمة: ${v.value}\n   ↪ النطاق المرجعي: ${v.reference_range}\n   ↪ الانحراف: ${v.deviation}\n   📝 ملاحظات: ${v.note}\n`;
        });

        output += `\n🩺 نصائح:\n- ${parsed.practical_advice.join('\n- ')}\n\n👨‍⚕️ الطبيب الموصى به: ${parsed.recommended_doctor}`;
        return output;
      }
      return raw;
    } catch (e) {
      return raw;
    }
  }

  sanitizeBotText(text: string): string {
    return text.replace(/\n/g, '<br>');
  }
}
