import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AlienService } from './services/alien.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  nickname: string;

  data$: Observable<any> | undefined;
  constructor(private readonly alienService: AlienService) {
    this.nickname = environment.nickname;
    this.refreshData();
  }

  sendData(data: string) {
    let messageData = {
      nickname: environment.nickname,
      message: data,
      sentAt: new Date().getTime()
    } 
    // this.data$ = this.alienService.sendData(messageData);
    this.alienService.sendData(messageData).subscribe((response) => {
      // Handle the response if needed
      if(response.status === 'ok'){
        this.refreshData();
      }
    });

  }
  refreshData() {
    this.data$ = this.alienService.getData();
  }
}
