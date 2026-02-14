import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],   // обязательно должен быть здесь
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {}
