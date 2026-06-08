// src/app/pages/home/home.ts

import { Component, AfterViewInit, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  greeting: string = '';

  ngOnInit(): void {
    const hour = new Date().getHours();

    if (hour < 12) {
      this.greeting = '☀️ Good Morning';
    } else if (hour < 17) {
      this.greeting = '🌤️ Good Afternoon';
    } else {
      this.greeting = '🌙 Good Evening';
    }
  }

  ngAfterViewInit(): void {
    new Typed('#typed', {
      strings: [
        'Creative Developer',
        'Full Stack Developer',
        'Flutter Mobile App Developer',
        'AI Application Developer'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1200,
      loop: true,
      showCursor: true,
      cursorChar: ''
    });
  }
}
